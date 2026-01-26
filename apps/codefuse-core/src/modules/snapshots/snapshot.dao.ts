import { prisma } from "@infra/db";
import { SnapShotSave } from "@repo/shared-types/core.types";

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
  state,
}: {
  roomId: string;
  state: Buffer;
}) => {
  await prisma.snapshot.create({
    data: {
      roomId,
      state,
    },
  });
};
