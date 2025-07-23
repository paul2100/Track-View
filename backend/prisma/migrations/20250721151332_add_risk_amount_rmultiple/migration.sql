/*
  Warnings:

  - You are about to drop the column `ratio_risk` on the `Trade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "ratio_risk",
ADD COLUMN     "r_multiple" DOUBLE PRECISION,
ADD COLUMN     "risk_amount" DOUBLE PRECISION;
