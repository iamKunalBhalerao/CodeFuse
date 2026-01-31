"use client";

import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-full bg-zinc-950 text-zinc-400">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
        <p className="text-sm font-medium animate-pulse">
          Initializing Editor...
        </p>
      </div>
    </div>
  ),
});

export default function EditorWrapper({ roomId }: { roomId: string }) {
  return <Editor roomId={roomId} />;
}
