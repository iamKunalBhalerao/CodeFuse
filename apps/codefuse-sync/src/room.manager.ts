import { WebSocket } from "ws";

type Room = {
  sockets: Set<WebSocket>;
  opCount: number;
};


const rooms = new Map<string, Room>();

export const getRoom = (roomId: string): Room => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      sockets: new Set(),
      opCount: 0,
    });
  }
  return rooms.get(roomId)!;
};

export const removeSocket = (roomId: string, socket: WebSocket) => {
  const room = rooms.get(roomId);
  if (!room) return;

  room.sockets.delete(socket);

  if (room.sockets.size === 0) {
    rooms.delete(roomId);
  }
};
