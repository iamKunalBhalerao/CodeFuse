"use client";
import React from "react";
import * as Y from "yjs";
import * as monaco from "monaco-editor";
import { Awareness } from "y-protocols/awareness.js";
import { MonacoBinding } from "y-monaco";
import { useEffect, useRef, useState } from "react";
import { WebsocketProvider } from "y-websocket";

const Editor = ({ roomName }: { roomName: string }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<string>("disconnected");

  useEffect(() => {
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText("codemirror");

    const awareness = new Awareness(ydoc);
    awareness.setLocalStateField("user", {
      name: "User-" + Math.floor(Math.random() * 1000),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      colorLight: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });

    const provider = new WebsocketProvider(
      "ws://localhost:1234",
      roomName,
      ydoc,
      { awareness },
    );

    provider.on(
      "status",
      (event: {
        status: "connected" | "disconnected" | "connecting" | "error";
        error?: Error;
      }) => {
        setStatus(event.status);
        console.log("Status:", event.status);
        if (event.error) {
          console.error("Error:", event.error);
        }
      },
    );

    const editor = monaco.editor.create(editorRef.current!, {
      value: "",
      language: "javascript",
      theme: "vs-dark",
      fontSize: 14,
      minimap: { enabled: true },
      automaticLayout: true,
    });

    const monacoBinding = new MonacoBinding(
      ytext,
      editor.getModel()!,
      new Set([editor]),
      awareness,
    );

    return () => {
      provider.disconnect();
      monacoBinding.destroy();
      ydoc.destroy();
      editor.dispose();
    };
  }, [roomName]);
  return (
    <>
      <div>
        <div>
          <span>Status: {status}</span>
        </div>
        <div ref={editorRef} style={{ height: "1000px" }} />
      </div>
    </>
  );
};

export default Editor;
