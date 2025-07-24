import cloudinary from '../utils/cloudinary.js';
import prisma from '../prisma/client.js';
import fs from 'fs';

export async function createTradeJournal(req, res) {
  try {
    const userId = req.user.id;
    const {
      tradeId,
      plan_trade,
      emotions,
      indicators,
      post_trade_analysis,
      type,
      timeframe
    } = req.body;

    const file = req.file;

    const existingJournal = await prisma.trade_journal.findUnique({
      where: { tradeId: parseInt(tradeId) },
    });

    if (existingJournal) {
      return res.status(400).json({ error: 'Un journal existe déjà pour ce trade.' });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'trading_journal',
    });

    fs.unlinkSync(file.path);

    const journal = await prisma.trade_journal.create({
      data: {
        userId: parseInt(userId),
        tradeId: parseInt(tradeId),
        plan_trade,
        emotions,
        indicators,
        post_trade_analysis,
      },
    });

    const screenshot = await prisma.trade_screenshot.create({
  data: {
    screenshotUrl: result.secure_url,
    type: type || "Before",
    timeframe: timeframe || "M15",
    tradeJournal: {
      connect: { id: journal.id },
    },
    trade: {
      connect: { id: parseInt(tradeId) },
    },
    user: {
      connect: {id: parseInt(userId)},
    },
  },
});



    res.status(201).json({ success: true, journal, screenshot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur création journal' });
  }
}


export async function getAllJournaux(req, res) {
  const userId = req.user.id;

  try {
    const allJournaux = await prisma.trade_journal.findMany({
      where: { userId },
      include: {
        trade: {
          select: {
            id: true,
            paire: true,
            createdAt: true,
            closedAt: true,
            direction: true,
            entryPrice: true,
            exitPrice: true,
            risk_amount: true,
            size_lot: true,
            status: true,
            stopLoss: true,
            takeProfit: true,
          },
        },
        tradeScreenshots: {
          select: {
            timeframe: true,
            screenshotUrl: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({ success: true, allJournaux });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des journaux' });
  }
}
