-- CreateEnum
CREATE TYPE "TradeDirection" AS ENUM ('Long', 'Short');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('Open', 'Closed', 'Cancelled');

-- CreateEnum
CREATE TYPE "ScreenshotType" AS ENUM ('Before', 'After', 'Annotated');

-- CreateEnum
CREATE TYPE "Timeframe" AS ENUM ('M1', 'M5', 'M15', 'H1', 'H4', 'D1');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "paire" TEXT NOT NULL,
    "direction" "TradeDirection" NOT NULL DEFAULT 'Long',
    "entryPrice" DOUBLE PRECISION NOT NULL,
    "exitPrice" DOUBLE PRECISION,
    "stopLoss" DOUBLE PRECISION,
    "takeProfit" DOUBLE PRECISION,
    "size_lot" DOUBLE PRECISION,
    "result" DOUBLE PRECISION,
    "ratio_risk" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "status" "TradeStatus" NOT NULL DEFAULT 'Open',

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portefeuille" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "solde_initial" DECIMAL(10,2) NOT NULL,
    "capital_actuel" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portefeuille_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capital_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "capital" DECIMAL(10,2) NOT NULL,
    "variation" DECIMAL(10,2) NOT NULL,
    "source_trade_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capital_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade_journal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tradeId" INTEGER NOT NULL,
    "screenshot_before_Url" TEXT,
    "screenshot_after_Url" TEXT,
    "plan_trade" TEXT,
    "emotions" TEXT,
    "indicators" TEXT,
    "post_trade_analysis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade_screenshot" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tradeId" INTEGER NOT NULL,
    "Trade_journalId" INTEGER NOT NULL,
    "screenshotUrl" TEXT NOT NULL,
    "type" "ScreenshotType" NOT NULL DEFAULT 'Before',
    "timeframe" "Timeframe" NOT NULL DEFAULT 'M15',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portefeuille_userId_key" ON "Portefeuille"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Trade_journal_tradeId_key" ON "Trade_journal"("tradeId");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portefeuille" ADD CONSTRAINT "Portefeuille_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capital_history" ADD CONSTRAINT "Capital_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capital_history" ADD CONSTRAINT "Capital_history_source_trade_id_fkey" FOREIGN KEY ("source_trade_id") REFERENCES "Trade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade_journal" ADD CONSTRAINT "Trade_journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade_journal" ADD CONSTRAINT "Trade_journal_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade_screenshot" ADD CONSTRAINT "Trade_screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade_screenshot" ADD CONSTRAINT "Trade_screenshot_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade_screenshot" ADD CONSTRAINT "Trade_screenshot_Trade_journalId_fkey" FOREIGN KEY ("Trade_journalId") REFERENCES "Trade_journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
