-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reservedBy" TEXT;
