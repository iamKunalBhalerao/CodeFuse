import { WebSocket } from "ws";

export interface Users {
  socket: WebSocket;
  rooms: string[];
  userId: string;
}
