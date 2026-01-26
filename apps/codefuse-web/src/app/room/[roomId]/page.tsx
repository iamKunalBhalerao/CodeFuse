"use client";
import dynamic from "next/dynamic";
import React from "react";
// import Editor from "@/components/Editor";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const page = async ({
  params,
}: {
  params: {
    roomId: string;
  };
}) => {
  const roomId = (await params).roomId;

  return (
    <>
      <div>
        <Editor roomName={roomId} />
      </div>
    </>
  );
};

export default page;
