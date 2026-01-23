import { WebSocket } from "ws";
import { users } from "./server";
import { Users } from "./types/ws.types";

export const handleConnection = (socket: WebSocket) => {
  // Init
  const currentUser: Users = { socket, rooms: [], userId: "" };
  users.push(currentUser);

  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === "JOIN_ROOM") {
      const { roomId, userId } = message.payload;
      currentUser.userId = userId;
      if (!currentUser.rooms.includes(roomId)) {
        currentUser.rooms.push(roomId);
      }
    }

    if (message.type === "LEAVE_ROOM") {
      const user = users.find((user) => user.socket === socket);
      if (!user || !user.rooms.includes(message.payload.roomId)) return;
      user.rooms = user.rooms.filter((room) => room !== message.payload.roomId);
    }

    if (message.type === "YJS_UPDATE") {
      const { roomId, state } = message.payload;

      users.forEach((user) => {
        if (user.socket === socket) return;
        if (user.rooms?.includes(roomId)) {
          user.socket.send(
            JSON.stringify({
              type: "YJS_UPDATE",
              payload: { roomId, state },
            }),
          );
        }
      });
    }
  });

  // To Handle Client Close Event
  socket.on("close", (code, reason) => {
    const index = users.indexOf(currentUser);
    if (index > -1) users.splice(index, 1);
    console.log(
      `Client disconnected: ${code} - ${reason.toString()}, Remaining: ${users.length}`,
    );
  });

  //   To handle Error Event
  socket.on("error", (error: unknown) => {
    console.error(`Error occured: ${(error as Error).message}`);
  });
};
