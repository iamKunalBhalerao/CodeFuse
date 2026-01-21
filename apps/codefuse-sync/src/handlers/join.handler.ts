import { WebSocket } from "ws";
import { getRoom } from "../room.manager";

export const handleJoin = async (
  socket: { roomId?: string; userId?: string; role?: string },
  message: {
    payload: {
      roomId: string;
      userId: string;
      role: string;
    };
  },
) => {
  const { roomId, userId, role } = message.payload;

  socket.roomId = roomId;
  socket.userId = userId;
  socket.role = role;

  const room = await getRoom(roomId);
  room.sockets.add(socket as WebSocket);
};
