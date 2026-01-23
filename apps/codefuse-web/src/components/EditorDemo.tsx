"use client";

import * as Y from "yjs";
import { useEffect, useRef } from "react";
import { createYjsDoc } from "@/yjs/doc";
import { fetchSnapShot } from "@/lib/api";
import { ConnectWS } from "@/lib/ws";

export default function EditorDemo({ roomId }: { roomId: string }) {
  const userId = `123`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const yDocRef = useRef<Y.Doc | null>(null);

  useEffect(() => {
    const init = async () => {
      const { doc, text } = createYjsDoc();
      yDocRef.current = doc;

      // Loads SnapShot
      const snapshot = await fetchSnapShot(roomId);
      Y.applyUpdate(doc, snapshot);

      // Bint text => textarea
      text.observe(() => {
        if (textareaRef.current) {
          textareaRef.current.value = text.toString();
        }
      });

      // WS connection
      ConnectWS(roomId, userId, doc);

      // Input => Yjs
      textareaRef.current!.oninput = (e: Event) => {
        text.delete(0, text.length);
        text.insert(0, (e.target as HTMLTextAreaElement).value);
      };
    };
    init();
  }, [roomId]);

  return (
    <>
      <div className="w-full h-screen">
        <textarea
          ref={textareaRef}
          className={"w-full h-screen p-4 text-lg"}
          placeholder="Start typing...."
        />
      </div>
    </>
  );
}
