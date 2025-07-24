/*
  Warnings:

  - You are about to drop the column `screenshot_after_Url` on the `Trade_journal` table. All the data in the column will be lost.
  - You are about to drop the column `screenshot_before_Url` on the `Trade_journal` table. All the data in the column will be lost.
  - Made the column `risk_amount` on table `Trade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "risk_amount" SET NOT NULL;

-- AlterTable
ALTER TABLE "Trade_journal" DROP COLUMN "screenshot_after_Url",
DROP COLUMN "screenshot_before_Url";
