import { env } from "@repo/env/server";
import { WebSocketServer } from "ws";
import { SnapShotCalc, Users } from "./types/ws.types";
import { handleConnection } from "./ws";

const PORT = Number(env.SYNC_PORT) || 8080;
if (!PORT) throw new Error("SYNC_PORT is not defined");

const wss = new WebSocketServer({ port: PORT });

export const users: Users[] = [];
export const snapShotCalcs: Record<string, SnapShotCalc> = {};

wss.on("connection", handleConnection);

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
