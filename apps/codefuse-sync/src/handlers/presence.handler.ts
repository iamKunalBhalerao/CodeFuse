import { WebSocket } from "ws";
import { getRoom } from "../room.manager";

export const handlePresence = async (
  socket: WebSocket & { roomId: string },
  message: string,
) => {
  const room = await getRoom(socket.roomId);

  for (const client of room.sockets) {
    if (client !== socket) {
      client.send(JSON.stringify(message));
    }
  }
};
