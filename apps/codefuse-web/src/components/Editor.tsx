"use client";
import * as Y from "yjs";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef } from "react";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

export default function Editor() {
  const editorRef = useRef<any>(null);
  useEffect(() => {
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText("monaco");

    const provider = new WebsocketProvider(
      "ws://localhost:8080",
      "monaco-demo",
      ydoc,
    );

    // Initialize Monaco Editor
    const editor = monaco.editor.create(editorRef.current!, {
      value: ytext.toString(),
      language: "typescript",
      theme: "vs-dark",
      automaticLayout: true,
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
  }, []);
  return (
    <>
      <div ref={editorRef} style={{ height: "100vh", width: "100%" }}>
        Editor Component
      </div>
    </>
  );
}
