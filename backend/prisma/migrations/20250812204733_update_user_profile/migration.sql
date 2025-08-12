/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `goalReturn` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `tradingStyle` on the `UserProfile` table. All the data in the column will be lost.
  - Made the column `lastProfileUpdate` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "avatarUrl",
DROP COLUMN "goalReturn",
DROP COLUMN "tradingStyle",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "timezone" SET DEFAULT 'Europe/Paris',
ALTER COLUMN "language" DROP DEFAULT,
ALTER COLUMN "lastProfileUpdate" SET NOT NULL,
ALTER COLUMN "lastProfileUpdate" SET DEFAULT CURRENT_TIMESTAMP;
