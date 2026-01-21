import { WebSocket } from "ws";
import { getRoom } from "../room.manager";
import { triggerSnapShotIfNeeded } from "../services/snapshot.service";
import { HandleOpMessage, Socket } from "../types/ws.types";
import { canEdit } from "../helpers/permission.helper";
import { broadcastToRoom } from "../services/broadcase.service";

export const handleOp = async (socket: Socket, message: HandleOpMessage) => {
  const room = await getRoom(socket.roomId);
  room.opCount++;

  // 2️⃣ Permission check
  if (!canEdit(socket.role)) {
    socket.send(
      JSON.stringify({
        type: "ERROR",
        message: "Permission denied",
      }),
    );
    return;
  }

  if (!message.payload.data || !message.payload.action) return;

  broadcastToRoom(socket, {
    type: "CRDT_OP",
    payload: {
      ...message.payload,
      userId: socket.userId,
    },
  });

  //   SnapShot Trigger
  if (room.opCount >= 100) {
    triggerSnapShotIfNeeded(
      socket.roomId,
      message.payload.data,
      message.payload.version,
    );
    room.opCount = 0;
  }
};
