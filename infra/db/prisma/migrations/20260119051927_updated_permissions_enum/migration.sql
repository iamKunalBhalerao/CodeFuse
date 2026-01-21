/*
  Warnings:

  - The values [REVIWER] on the enum `Permission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Permission_new" AS ENUM ('OWNER', 'REVIEWER', 'VIEWER');
ALTER TABLE "public"."RoomMember" ALTER COLUMN "permission" DROP DEFAULT;
ALTER TABLE "RoomMember" ALTER COLUMN "permission" TYPE "Permission_new" USING ("permission"::text::"Permission_new");
ALTER TYPE "Permission" RENAME TO "Permission_old";
ALTER TYPE "Permission_new" RENAME TO "Permission";
DROP TYPE "public"."Permission_old";
ALTER TABLE "RoomMember" ALTER COLUMN "permission" SET DEFAULT 'VIEWER';
COMMIT;
