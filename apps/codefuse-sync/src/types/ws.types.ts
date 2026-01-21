import { WebSocket } from "ws";

export interface Socket extends WebSocket {
  userId: string;
  roomId: string;
  role: "OWNER" | "EDITOR";
}

export interface HandleOpMessage {
  type: string;
  payload: {
    roomId: string;
    userId: string;
    opId: string;
    role: string;
    action: "insert" | "delete";
    data: string;
    version: number;
  };
}

export interface HandleJoinMessage {
  type: string;
  payload: {
    roomId: string;
    userId: string;
    role: string;
  };
}
