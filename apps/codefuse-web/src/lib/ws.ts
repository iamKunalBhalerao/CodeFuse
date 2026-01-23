import { bindYjsToWS } from "@/yjs/provider";
import { ClientEnv } from "@repo/env";
import * as Y from "yjs";

export const ConnectWS = async (roomId: string, userId: string, doc: Y.Doc) => {
  const socket = new WebSocket(`${ClientEnv.NEXT_PUBLIC_SYNC_API_URL}`);

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        roomId,
        userId,
      }),
    );
    bindYjsToWS(doc, socket, roomId);
  };

  return socket;
};
