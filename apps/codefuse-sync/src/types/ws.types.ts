import * as Y from "yjs";
import { WebSocket } from "ws";

export interface Users {
  socket: WebSocket;
  rooms: string[];
  userId: string;
}

export interface SnapShotCalc {
  opCount: number;
  lastSnapShotAt: number;
}

export const MAX_OPS = 50;
export const SNAPSHOT_INTERVAL = 30_000; // 30 sec

export interface Room {
  name: string;
  doc: Y.Doc;
  clients: Set<WebSocket>;
}

export interface JoinMessage {
  type: "join";
  room: string;
}

export interface CustomMessage {
  type: "custom";
  [key: string]: any;
}
