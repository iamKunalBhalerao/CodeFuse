import { prisma } from "@infra/db";

export const findRoomByName = async (name: string) => {
  return await prisma.room.findFirst({
    where: {
      name: name,
    },
  });
};

export const findRoomById = async (roomId: string) => {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
};

export const createRoom = async ({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) => {
  return await prisma.room.create({
    data: {
      name: name,
      ownerId: userId,
    },
  });
};

export const joinRoom = async ({
  roomId,
  userId,
}: {
  userId: string;
  roomId: string;
}) => {
  return await prisma.roomMember.create({
    data: {
      roomId,
      userId,
    },
  });
};

export const setRoomOwner = async ({
  roomId,
  userId,
}: {
  userId: string;
  roomId: string;
}) => {
  return await prisma.roomMember.create({
    data: {
      roomId,
      userId,
      permission: "OWNER",
    },
  });
};

export const setRoomEditor = async ({
  roomId,
  userId,
}: {
  userId: string;
  roomId: string;
}) => {
  return await prisma.roomMember.create({
    data: {
      roomId,
      userId,
      permission: "EDITOR",
    },
  });
};

export const findRoomMember = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  return await prisma.roomMember.findFirst({
    where: {
      roomId,
      userId,
    },
  });
};

export const findRoomOwner = async ({
  roomId,
  userId,
  role,
}: {
  userId: string;
  roomId: string;
  role: "OWNER";
}) => {
  return await prisma.roomMember.findFirst({
    where: {
      roomId,
      userId,
      permission: role,
    },
  });
};