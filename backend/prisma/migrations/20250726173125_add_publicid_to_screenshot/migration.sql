/*
  Warnings:

  - Added the required column `publicId` to the `Trade_screenshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade_screenshot" ADD COLUMN     "publicId" TEXT NOT NULL;
