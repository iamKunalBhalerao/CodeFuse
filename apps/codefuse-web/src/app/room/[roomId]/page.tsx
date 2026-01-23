import React from "react";
import EditorDemo from "@/components/EditorDemo";

export default function Room({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const { roomId } = params;

  return (
    <>
      <main className="">
        <EditorDemo roomId={roomId} />
      </main>
    </>
  );
}
