import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@repo/errors";
import { findRoomById } from "../room/room.dao";
import {
  deleteOldSnapshotsByRoomId,
  getSnapShotByRoomId,
  saveSnapShotInDB,
} from "./snapshot.dao";
import { isRoomMember } from "../../helper/permission.helper";
import { SnapShotSave } from "@repo/shared-types/core.types";

export const getSnapShotService = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const room = await findRoomById(roomId);
  if (!room) throw new NotFoundError("Room not found!");

  const snapshot = await getSnapShotByRoomId(room.id);
  if (!snapshot) throw new NotFoundError("No snapshot found for this Room!");

  const member = await isRoomMember({ userId, roomId });
  if (!member) throw new UnauthorizedError("User is not a member of the room");

  return snapshot;
};

export const saveSnapShotService = async ({ roomId, state }: SnapShotSave) => {
  if (!roomId || !state) throw new BadRequestError("Invalid data provided");

  const BufferState = Buffer.from(state, "base64");

  const room = await findRoomById(roomId);
  if (!room) throw new NotFoundError("Room not found!");

  await deleteOldSnapshotsByRoomId(room.id);

  await saveSnapShotInDB({ roomId: room.id, state: BufferState });
};
