import { WebSocket } from "ws";
import * as Y from "yjs";
import { rooms } from "../ws";

export function getRoom(roomName: string) {
  if (!rooms.has(roomName)) {
    const doc = new Y.Doc();
    rooms.set(roomName, {
      name: roomName,
      doc,
      clients: new Set(),
    });
    console.log(`Created room: ${roomName}`);
  }
  return rooms.get(roomName);
}

export function broadcast(
  room: { clients: Set<WebSocket> },
  message: any,
  exclude: WebSocket | null = null,
) {
  if (!room) return;

  room.clients.forEach((client) => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
