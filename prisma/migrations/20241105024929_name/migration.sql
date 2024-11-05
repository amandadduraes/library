/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "note";
