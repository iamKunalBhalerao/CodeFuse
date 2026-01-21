import { WebSocket } from "ws";
import { handleJoin } from "./handlers/join.handler";
import { handleOp } from "./handlers/op.handler";
import { handlePresence } from "./handlers/presence.handler";
import { Socket } from "./types/ws.types";

export const handleConnection = async (socket: Socket) => {
  socket.on("message", (data) => {
    const message = JSON.parse(data as unknown as string);

    switch (message.type) {
      case "join_room":
        handleJoin(socket, message);
        break;

      case "CRDT_OP":
        handleOp(socket, message);
        break;

      case "PRESENCE":
        handlePresence(socket, message);
        break;

      default:
        console.log("Unknown message type:", message.type);
    }
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed");
  });
};
