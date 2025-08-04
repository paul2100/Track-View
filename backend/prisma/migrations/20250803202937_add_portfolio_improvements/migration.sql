/*
  Warnings:

  - You are about to drop the column `currency` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Capital_history" ALTER COLUMN "capital" SET DATA TYPE DECIMAL(12,4),
ALTER COLUMN "variation" SET DATA TYPE DECIMAL(12,4);

-- AlterTable
ALTER TABLE "Portefeuille" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EUR',
ADD COLUMN     "leverage" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
ADD COLUMN     "risk_per_trade" DOUBLE PRECISION NOT NULL DEFAULT 0.01,
ALTER COLUMN "solde_initial" SET DATA TYPE DECIMAL(12,4),
ALTER COLUMN "capital_actuel" SET DATA TYPE DECIMAL(12,4);

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "currency";
