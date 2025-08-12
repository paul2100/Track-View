-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "lastProfileUpdate" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "tradingStyle" SET DEFAULT 'Swing Trading';
