import { WebSocket } from "ws";
import * as Y from "yjs";
import { broadcast, getRoom } from "./utils/room.utils";
import { Room } from "./types/ws.types";
import { IncomingMessage } from "http";

export const rooms = new Map<string, Room>();

export const handleConnection = (
  socket: WebSocket,
  request: IncomingMessage,
) => {
  let currentRoom: Room | null | undefined = null;

  // Extract room name from URL (e.g., /room-name)
  const urlRoom = (request.url || "").slice(1).split("?")[0];
  if (urlRoom && urlRoom !== "") {
    currentRoom = getRoom(urlRoom) || null;
    if (currentRoom) {
      currentRoom.clients.add(socket);
    }
  }

  socket.on("message", (data) => {
    // Handle JSON messages (String or Buffer/Uint8Array)
    if (
      typeof data === "string" ||
      data instanceof String ||
      data instanceof Buffer
    ) {
      try {
        const messageString = data.toString();
        const message = JSON.parse(messageString);

        if (message.type === "join") {
          // If already in a room, leave it first
          if (currentRoom) {
            currentRoom.clients.delete(socket);
          }

          currentRoom = getRoom(message.room) || null;
          if (currentRoom) {
            currentRoom.clients.add(socket);

            // Send confirmation
            socket.send(
              JSON.stringify({
                type: "joined",
                room: message.room,
                clients: currentRoom.clients.size,
              }),
            );

            // Notify other clients
            broadcast(
              currentRoom,
              JSON.stringify({
                type: "user-joined",
                clients: currentRoom.clients.size,
              }),
              socket,
            );

            // Send current document state to new client
            const update = Y.encodeStateAsUpdate(currentRoom.doc);
            socket.send(update);
          }
        }

        if (message.type === "custom") {
          if (currentRoom) {
            broadcast(currentRoom, JSON.stringify(message), socket);
          }
        }
      } catch (e) {
        // If it's not JSON, it might be binary (handled below)
        if (!(data instanceof Buffer)) {
          console.error("Error parsing message:", e);
        }
      }
    }

    // Handle binary Yjs updates
    if (currentRoom && data instanceof Buffer && !(typeof data === "string")) {
      try {
        // Check if it's a valid Yjs update by attempting to apply it
        // Note: In a production app, you'd want more robust validation
        Y.applyUpdate(currentRoom.doc, new Uint8Array(data));

        // Broadcast to other clients in the same room
        broadcast(currentRoom, data, socket);
      } catch (e) {
        // Not a valid Yjs update or already handled as JSON
      }
    }
  });

  socket.on("close", (code, reason) => {
    if (currentRoom) {
      currentRoom.clients.delete(socket);

      // Notify others
      broadcast(
        currentRoom,
        JSON.stringify({
          type: "user-left",
          clients: currentRoom.clients.size,
        }),
      );

      // Clean up empty rooms
      if (currentRoom.clients.size === 0) {
        rooms.delete(currentRoom.name);
      }
    }
  });

  socket.on("error", (error: Error) => {
    console.error(`Error occurred: ${error.message}`);
  });
};
