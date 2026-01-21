import { UnauthorizedError } from "@repo/errors";
import { findRoomMember, findRoomOwner } from "../modules/room/room.dao";

export const isRoomOwner = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const isOwner = await findRoomOwner({ roomId, userId, role: "OWNER" });
  return !!isOwner;
};

export const isRoomMember = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const isMember = await findRoomMember({ roomId, userId });
  return !!isMember;
};

export const canEdit = async (userRole: string) => {
  // TODO: Implement the logic to check if the user is a member of the room
  return true; // Placeholder return value
};
