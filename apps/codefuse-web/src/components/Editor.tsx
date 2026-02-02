"use client";
import * as Y from "yjs";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { EditorHeader } from "./EditorHeader";
import Terminal, { TerminalHandle } from "./Terminal";
import axios from "axios";
import { createYjsDoc } from "../yjs/doc";

const LANGUAGE_VERSIONS: Record<string, string> = {
  typescript: "5.0.3",
  javascript: "18.15.0",
  python: "3.10.0",
  cpp: "10.2.0",
  go: "1.16.2",
};

export default function Editor({ roomId }: { roomId: string }) {

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const terminalRef = useRef<TerminalHandle>(null);
  const configMapRef = useRef<Y.Map<any> | null>(null);

  const [language, setLanguage] = useState("typescript");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  useEffect(() => {
    if (!roomId || !containerRef.current) return;

    const {ydoc, ytext} = createYjsDoc();

    const provider = new WebsocketProvider("ws://localhost:8080", roomId, ydoc);

    provider.on("status", (event: { status: string }) => {
      setStatus(event.status as any);
      if (event.status === "connected") {
        provider.ws?.send(
          JSON.stringify({
            type: "join",
            room: roomId,
          }),
        );
      }
    });

    const editor = monaco.editor.create(containerRef.current, {
      value: ytext.toString(),
      language: language,
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      minimap: { enabled: true },
      padding: { top: 20 },
      cursorSmoothCaretAnimation: "on",
      cursorBlinking: "smooth",
      smoothScrolling: true,
      lineNumbers: "on",
      roundedSelection: true,
      scrollBeyondLastLine: false,
      readOnly: false,
      scrollbar: {
        vertical: "visible",
        horizontal: "visible",
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
      bracketPairColorization: {
        enabled: true,
      },
    });

    editorRef.current = editor;

    new MonacoBinding(
      ytext,
      /** @ts-expect-error typeerror */
      editor.getModel(),
      new Set([editor]),
      provider.awareness,
    );

    const sharedConfig = ydoc.getMap("config");
    configMapRef.current = sharedConfig;

    sharedConfig.observe((event) => {
      if (event.keysChanged.has("language")) {
        const newLang = sharedConfig.get("language") as string;
        if (newLang) setLanguage(newLang);
      }
    });

    // Set initial language if not present
    if (!sharedConfig.has("language")) {
      sharedConfig.set("language", "typescript");
    } else {
      setLanguage(sharedConfig.get("language") as string);
    }

    return () => {
      editor.dispose();
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomId]);

  // Update language when state changes
  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  const handleRunCode = async () => {
    if (!editorRef.current || !terminalRef.current) return;

    const code = editorRef.current.getValue();
    if (!code.trim()) {
      terminalRef.current.writeln("\x1b[31mNo code to run!\x1b[0m");
      return;
    }

    setIsRunning(true);
    terminalRef.current.clear();
    terminalRef.current.writeln(`\x1b[33m[Running ${language}...]\x1b[0m`);

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language,
          version: "*",
          files: [
            {
              name: `main.${language === "typescript" ? "ts" : language === "python" ? "py" : language === "javascript" ? "js" : language === "cpp" ? "cpp" : "txt"}`,
              content: code,
            },
          ],
        },
      );

      const { stdout, stderr, signal } = response.data.run;

      // xterm.js requires \r\n for new lines
      const formatOutput = (text: string) => text.replace(/\n/g, "\r\n");

      if (stdout) {
        terminalRef.current.write(formatOutput(stdout));
      }
      if (stderr) {
        terminalRef.current.write(`\x1b[31m${formatOutput(stderr)}\x1b[0m`);
      }

      if (signal) {
        terminalRef.current.writeln(
          `\r\n\x1b[31m[Process terminated with signal: ${signal}]\x1b[0m`,
        );
      }

      if (!stdout && !stderr) {
        terminalRef.current.writeln(
          "\x1b[90m(Execution finished with no output)\x1b[0m",
        );
      }

      terminalRef.current.writeln(`\r\n\x1b[32m[Finished successfully]\x1b[0m`);
    } catch (error: any) {
      console.error("Execution error:", error);
      const errorMessage = error.response?.data?.message || error.message;
      terminalRef.current.writeln(
        `\r\n\x1b[31mExecution Error: ${errorMessage}\x1b[0m`,
      );

      if (error.response?.status === 404) {
        terminalRef.current.writeln(
          "\x1b[31mTip: Check if the language is supported or if the API endpoint is correct.\x1b[0m",
        );
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden">
      <EditorHeader
        roomId={roomId}
        language={language}
        setLanguage={(newLang) => {
          setLanguage(newLang);
          configMapRef.current?.set("language", newLang);
        }}
        status={status}
        onRun={handleRunCode}
        isRunning={isRunning}
      />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 relative">
          <div ref={containerRef} className="h-full w-full" />
        </div>

        {/* Terminal Section */}
        <div className="h-1/3 border-t border-zinc-800 flex flex-col">
          <div className="flex items-center px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
              Terminal
            </span>
          </div>
          <div className="flex-1 bg-zinc-900">
            <Terminal ref={terminalRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
