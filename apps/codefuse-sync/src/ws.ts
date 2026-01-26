import { WebSocket } from "ws";
import * as Y from "yjs";
import { broadcast, getRoom } from "./utils/room.utils";
import { Room } from "./types/ws.types";

export const rooms = new Map();

export const handleConnection = (socket: WebSocket, request: Request) => {
  let currentRoom: Room | null = null;

  socket.on("message", (data) => {
    // Handle JSON messages
    if (typeof data === "string" || data instanceof String) {
      try {
        const message = JSON.parse(data.toString());

        if (message.type === "join") {
          currentRoom = getRoom(message.room);
          if (currentRoom) {
            currentRoom.clients.add(socket);

            console.log(`Client joined room: ${message.room}`);

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
            const stateVector = Y.encodeStateVector(currentRoom.doc);
            const update = Y.encodeStateAsUpdate(currentRoom.doc);
            socket.send(update);
          }
        }

        // HERE: You can add your custom logic
        // Log data, validate, transform, store in DB, etc.
        if (message.type === "custom") {
          console.log("Custom message received:", message);
          // Process and broadcast
          if (currentRoom) {
            broadcast(currentRoom, JSON.stringify(message));
          }
        }
      } catch (e) {
        console.error("Error parsing message:", e);
      }
      return;
    }

    // Handle binary Yjs updates
    if (currentRoom && data instanceof Buffer) {
      // HERE: You can intercept and process the update
      console.log("Yjs update received, size:", data.length);

      // Apply update to server's document
      Y.applyUpdate(currentRoom.doc, new Uint8Array(data));

      // Optional: Store in database
      // await saveUpdate(currentRoom.name, data)

      // Broadcast to other clients
      broadcast(currentRoom, data, socket);
    }
  });

  socket.on("close", () => {
    if (currentRoom) {
      currentRoom.clients.delete(socket);
      console.log(`Client left room. Remaining: ${currentRoom.clients.size}`);

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
        console.log(`Room ${currentRoom.name} deleted`);
      }
    }
  });

  // To Handle Client Close Event
  socket.on("close", (code, reason) => {
    console.log(
      `Client disconnected: ${code} - ${reason.toString()}, Remaining: ${rooms.size}`,
    );
  });

  //   To handle Error Event
  socket.on("error", (error: unknown) => {
    console.error(`Error occured: ${(error as Error).message}`);
  });
};
