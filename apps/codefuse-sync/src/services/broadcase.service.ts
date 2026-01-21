import { WebSocket } from "ws";
import { getRoom } from "../room.manager";

interface Client {
  roomId: string;
  send: (data: string) => void;
}

export const broadcastToRoom = (
  sender: WebSocket & Client,
  message: unknown,
) => {
  const room = getRoom(sender.roomId);

  for (const client of room.sockets) {
    if (client !== sender) {
      client.send(JSON.stringify(message));
    }
  }
};
