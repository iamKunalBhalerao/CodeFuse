import { prisma } from "@infra/db";

export const getSnapShotByRoomId = async (roomId: string) => {
  return await prisma.snapshot.findFirst({
    where: { roomId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteOldSnapshotsByRoomId = async (roomId: string) => {
  await prisma.snapshot.deleteMany({
    where: { roomId },
  });
};

export const saveSnapShotInDB = async ({
  roomId,
  version,
  data,
}: {
  roomId: string;
  version: number;
  data: string;
}) => {
  await prisma.snapshot.create({
    data: {
      version,
      roomId,
      data,
    },
  });
};
