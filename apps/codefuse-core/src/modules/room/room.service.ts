import {
  BadRequestError,
  InvalidInputsError,
  NotFoundError,
} from "@repo/errors";
import { CRUDRoomZodSchema } from "@repo/shared-types/zod.types";
import {
  createRoom,
  findRoomById,
  findRoomByName,
  findRoomMember,
  joinRoom,
  setRoomOwner,
} from "./room.dao";
import { Room } from "@repo/shared-types/core.types";

export const createRoomService = async ({
  data,
  userId,
}: {
  data: Room;
  userId: string;
}) => {
  const parsedData = CRUDRoomZodSchema.safeParse(data);
  if (!parsedData.success) throw new InvalidInputsError("Invalid Inputs!");
  const { name } = parsedData.data;

  const isRoomExists = await findRoomByName(name);
  if (isRoomExists) throw new BadRequestError("Room with this name already exists!");

  const room = await createRoom({ userId, name });
  if (!room) throw new BadRequestError("Failed to create room!");

  const setOwner = await setRoomOwner({ roomId: room.id, userId });
  if (!setOwner) throw new BadRequestError("Failed to set room owner!");

  return room;
};

export const joinRoomService = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const room = await findRoomById(roomId);
  if (!room) throw new NotFoundError("Room Not Found!");

  const joinRoomResult = await joinRoom({ roomId: room.id, userId });
  if (!joinRoomResult) throw new BadRequestError("Failed to join room!");

  return joinRoomResult;
};

export const getRoomService = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const room = await findRoomById(roomId);
  if (!room) throw new NotFoundError("Room Not Found!");

  const roomMember = await findRoomMember({ userId, roomId });
  if (!roomMember)
    throw new BadRequestError("You are not a member of this room!");

  return { room, roomMember };
};
