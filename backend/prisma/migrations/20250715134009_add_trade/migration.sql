/*
  Warnings:

  - The `direction` column on the `Trade` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Trade` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Trade_screenshot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `timeframe` column on the `Trade_screenshot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "direction",
ADD COLUMN     "direction" TEXT NOT NULL DEFAULT 'Long',
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Open';

-- AlterTable
ALTER TABLE "Trade_screenshot" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Before',
DROP COLUMN "timeframe",
ADD COLUMN     "timeframe" TEXT NOT NULL DEFAULT 'M15';

-- DropEnum
DROP TYPE "ScreenshotType";

-- DropEnum
DROP TYPE "Timeframe";

-- DropEnum
DROP TYPE "TradeDirection";

-- DropEnum
DROP TYPE "TradeStatus";
