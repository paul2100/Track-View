import cloudinary from '../utils/cloudinary.js';
import prisma from '../prisma/client.js';
import fs from 'fs';


// cree un journal de trading 
export async function createTradeJournal(req, res) {
  try {
    const userId = req.user.id;
    const {tradeId,plan_trade,emotions,indicators,post_trade_analysis,types,timeframes} = req.body;

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Aucune image fournie.' });
    }

    const parsedTypes = Array.isArray(types) ? types : [types];
    const parsedTimeframes = Array.isArray(timeframes) ? timeframes : [timeframes];

    if (parsedTypes.length !== files.length || parsedTimeframes.length !== files.length) {
      return res.status(400).json({ error: 'Le nombre de types/timeframes ne correspond pas au nombre d’images.' });
    }

    const existingJournal = await prisma.trade_journal.findUnique({
      where: { tradeId: parseInt(tradeId) },
    });

    if (existingJournal) {
      return res.status(400).json({ error: 'Un journal existe déjà pour ce trade.' });
    }

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

    const screenshots = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'trading_journal',
      });

      fs.unlink(file.path, (err) => {
        if (err) console.error('Erreur suppression fichier temporaire:', err);
      });

      const screenshot = await prisma.trade_screenshot.create({
        data: {
          screenshotUrl: result.secure_url,
          publicId: result.public_id,
          type: parsedTypes[i] || 'Before',
          timeframe: parsedTimeframes[i] || 'M15',
          tradeJournal: {
            connect: { id: journal.id },
          },
          trade: {
            connect: { id: parseInt(tradeId) },
          },
          user: {
            connect: { id: parseInt(userId) },
          },
        },
      });

      screenshots.push(screenshot);
    }

    res.status(201).json({ success: true, journal, screenshots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du journal.' });
  }
}

// supprime un journal precis avec son id
export async function deleteJournalById(req , res) {
  const userId = req.user.id;
  const journalId = Number(req.params.id);


  try {
  const findJournalExistantById = await prisma.trade_journal.findUnique({where: {id: journalId}});

  if (!findJournalExistantById || findJournalExistantById.length === 0) {
    return res.status(404).json({error: `Aucuns journal avec cet id n'existe`});
  }

  if (findJournalExistantById.userId !== userId) {
      return res.status(403).json({error: `Vous n'avez pas accès ou le Journal ne vous appartient pas !`})
  }

  const allscreenByjournalId = await prisma.trade_screenshot.findMany({where: {Trade_journalId: journalId}});

  for (const screenshot of allscreenByjournalId) {
    if (screenshot.publicId) {
      await cloudinary.uploader.destroy(screenshot.publicId);
    }
  }

  await prisma.trade_screenshot.deleteMany({ where: { Trade_journalId: journalId } });


  await prisma.trade_journal.delete({where: {id: journalId}});

  return res.status(200).json({success: true});
} catch (error) {
  console.error(error);
  return res.status(500).json({success: false , message: 'Erreur server !'});
}

}


// modifie un journal precis 

export async function updateJournalById(req, res) {
  const userId = req.user.id;
  const journalId = Number(req.params.id);
  const { tradeId, plan_trade, emotions, indicators, post_trade_analysis, types, timeframes } = req.body;
  const files = req.files;

  try {
    const journalById = await prisma.trade_journal.findUnique({
      where: { id: journalId },
      include: {
        trade: true
      }
    });

    if (!journalById) {
      return res.status(404).json({ error: `Aucun journal avec cet id n'existe` });
    }

    if (journalById.userId !== userId) {
      return res.status(403).json({ error: `Vous n'avez pas accès ou le Journal ne vous appartient pas !` });
    }

    await prisma.trade_journal.update({
      where: { id: journalId },
      data: {
        plan_trade,
        emotions,
        indicators,
        post_trade_analysis,
      },
    });

    if (files && files.length > 0) {
      const allScreenshots = await prisma.trade_screenshot.findMany({ where: { Trade_journalId: journalId } });
      for (const screenshot of allScreenshots) {
        if (screenshot.publicId) {
          await cloudinary.uploader.destroy(screenshot.publicId);
        }
      }
      await prisma.trade_screenshot.deleteMany({ where: { Trade_journalId: journalId } });

      const parsedTypes = Array.isArray(types) ? types : [types];
      const parsedTimeframes = Array.isArray(timeframes) ? timeframes : [timeframes];

      if (parsedTypes.length !== files.length || parsedTimeframes.length !== files.length) {
        return res.status(400).json({ error: 'Le nombre de types/timeframes ne correspond pas au nombre d’images.' });
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'trading_journal',
        });

        fs.unlink(file.path, (err) => {
          if (err) console.error('Erreur suppression fichier temporaire:', err);
        });

        await prisma.trade_screenshot.create({
          data: {

            screenshotUrl: result.secure_url,
            publicId: result.public_id,
            type: parsedTypes[i] || 'Before',
            timeframe: parsedTimeframes[i] || 'M15',
            tradeJournal: { connect: { id: journalId } },
            trade: { connect: { id: parseInt(journalById.trade.id) } },
            user: { connect: { id: userId } },
          },
        });
      }
    }

    return res.status(200).json({ success: true, message: 'Journal mis à jour' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur !' });
  }
}






// recup tous les journaux 
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
            result: true
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
    return res.status(500).json({ error: 'Erreur lors de la récupération des journaux.' });
  }
}







// recup le journal avec par son id
export async function getJournalById(req, res) {
  const userId = req.user.id;
  const journalId = Number(req.params.id);

  try {
    const journal = await prisma.trade_journal.findUnique({
      where: { id: journalId },
      select: {
        userId: true,
        plan_trade: true,
        emotions: true,
        indicators: true,
        post_trade_analysis: true,
        createdAt: true,
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
            result : true
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
    });

    if (!journal) {
      return res.status(404).json({ error: 'Journal introuvable !' });
    }

    if (journal.userId !== userId) {
      return res.status(403).json({ error: 'Accès non autorisé pour ce trade !' });
    }

    return res.status(200).json({ success: true, journal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la récupération du journal.' });
  }
}
