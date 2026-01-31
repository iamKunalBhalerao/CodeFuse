"use client";
import * as Y from "yjs";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef } from "react";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

export default function Editor({ roomId }: { roomId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [status, setStatus] = React.useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  useEffect(() => {
    if (!roomId || !containerRef.current) return;

    const ydoc = new Y.Doc();
    const ytext = ydoc.getText("monaco");

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
      language: "typescript",
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      minimap: { enabled: true },
      padding: { top: 16 },
      scrollbar: {
        vertical: "auto",
        horizontal: "auto",
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

    return () => {
      editor.dispose();
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomId]);

  return (
    <div className="relative h-screen w-full bg-zinc-950">
      <div ref={containerRef} className="h-full w-full" />
      {/* Subtle Connection Status */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm z-50">
        <div
          className={`h-2 w-2 rounded-full ${
            status === "connected"
              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              : status === "connecting"
                ? "bg-amber-500 animate-pulse"
                : "bg-red-500"
          }`}
        />
        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
          {status}
        </span>
      </div>
    </div>
  );
}
