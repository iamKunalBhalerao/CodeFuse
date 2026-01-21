/*
  Warnings:

  - You are about to drop the column `code` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Snapshot` table. All the data in the column will be lost.
  - You are about to drop the `Annotation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Snapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Snapshot" DROP COLUMN "state",
ADD COLUMN     "data" TEXT NOT NULL;

-- DropTable
DROP TABLE "Annotation";

-- CreateTable
CREATE TABLE "room_events" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "room_events_roomId_idx" ON "room_events"("roomId");
