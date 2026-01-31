import React from "react";
import EditorWrapper from "@/components/EditorWrapper";

interface RoomPageProps {
  params: Promise<{ roomId: string }>;
}

export default async function Page({ params }: RoomPageProps) {
  const { roomId } = await params;

  return (
    <main className="h-screen w-full overflow-hidden">
      <EditorWrapper roomId={roomId} />
    </main>
  );
}
