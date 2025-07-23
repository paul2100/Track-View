import prisma from '../prisma/client.js';

const VALID_STATUS = ['OPEN', 'CLOSED', 'CANCELLED'];
const VALID_DIRECTIONS = ['LONG', 'SHORT'];

export async function createTrade(req, res) {
  const userId = req.user.id;
  let {status,direction,paire,risk_amount,result,size_lot,takeProfit,stopLoss,exitPrice,entryPrice} = req.body;

  status = 'OPEN';

  if (!status || !direction || !paire || typeof entryPrice !== 'number' || entryPrice <= 0) {
    return res.status(400).json({ error: 'Champs obligatoires manquants ou invalides' });
  }

  try {
    const trade = await prisma.trade.create({
      data: {
        userId,
        status,
        direction,
        paire,
        risk_amount: size_lot ?? null,
        size_lot: size_lot ?? null,
        entryPrice,
        takeProfit: takeProfit ?? null,
        stopLoss: stopLoss ?? null,
        exitPrice: exitPrice ?? null,
        result: result ?? null,
      },
    });

    return res.status(200).json({ success: true, trade });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur lors de la création du trade." });
  }
}

export async function updateTrade(req, res) {
  const userId = req.user.id;
  const tradeId = Number(req.params.id);
  const {status,direction,paire,risk_amount,result,size_lot,takeProfit,stopLoss,exitPrice,entryPrice} = req.body;

  try {
    const tradeById = await prisma.trade.findUnique({ where: { id: tradeId } });

    if (!tradeById) {
      return res.status(404).json({ error: 'Erreur trade introuvable !' });
    }

    if (tradeById.userId !== userId) {
      return res.status(403).json({ error: "Erreur : le trade n'appartient pas à l'utilisateur connecté" });
    }

    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({ error: "Status invalide, doit être 'OPEN', 'CLOSED' ou 'CANCELLED'" });
    }

    if (direction && !VALID_DIRECTIONS.includes(direction)) {
      return res.status(400).json({ error: "Direction invalide, doit être 'LONG' ou 'SHORT'" });
    }

    if (paire && (typeof paire !== 'string' || paire.trim() === '')) {
      return res.status(400).json({ error: 'Paire doit être une chaîne non vide' });
    }

    if (entryPrice !== undefined && (typeof entryPrice !== 'number' || entryPrice <= 0)) {
      return res.status(400).json({ error: 'entryPrice doit être un nombre strictement positif' });
    }

    const portefeuilleUser = await prisma.portefeuille.findUnique({ where: { userId } });
    if (!portefeuilleUser) {
      return res.status(404).json({ error: 'Portefeuille introuvable' });
    }

    let capitalHistoryEntry = null;
    let deleteEntryCapitalHistory = null;
    let newCapital = Number(portefeuilleUser.capital_actuel);

    const oldStatus = tradeById.status;
    const newStatus = status ?? oldStatus;

    const oldResult = Number(tradeById.result ?? 0);
    const newResult = result !== undefined ? Number(result) : oldResult;


    if (oldStatus !== 'CLOSED' && newStatus === 'CLOSED') {
      newCapital += newResult;

      await prisma.portefeuille.update({
        where: { userId },
        data: { capital_actuel: newCapital },
      });

      capitalHistoryEntry = await prisma.capital_history.create({
        data: {
          source_trade_id: tradeId,
          userId,
          variation: newResult,
          capital: newCapital.toString(),
        },
      });
    }
    else if (oldStatus === 'CLOSED' && newStatus !== 'CLOSED') {
      newCapital -= oldResult;

      const capitalHistoryEntryToDelete = await prisma.capital_history.findFirst({
        where: { source_trade_id: tradeId },
      });

      if (capitalHistoryEntryToDelete) {
        deleteEntryCapitalHistory = await prisma.capital_history.delete({
          where: { id: capitalHistoryEntryToDelete.id },
        });
      }

      await prisma.portefeuille.update({
        where: { userId },
        data: { capital_actuel: newCapital },
      });
    }
    else if (oldStatus === 'CLOSED' && newStatus === 'CLOSED' && newResult !== oldResult) {
      const resultDifference = newResult - oldResult;
      newCapital += resultDifference;

      await prisma.portefeuille.update({
        where: { userId },
        data: { capital_actuel: newCapital },
      });

      const capitalHistoryEntryToUpdate = await prisma.capital_history.findFirst({
        where: { source_trade_id: tradeId },
      });

      if (capitalHistoryEntryToUpdate) {
        capitalHistoryEntry = await prisma.capital_history.update({
          where: { id: capitalHistoryEntryToUpdate.id },
          data: {
            variation: newResult, 
            capital: newCapital.toString(),
          },
        });
      }
    }

    let closedAtValue = tradeById.closedAt;
    
    if (oldStatus !== 'CLOSED' && newStatus === 'CLOSED') {
      closedAtValue = new Date();
    } else if (oldStatus === 'CLOSED' && newStatus !== 'CLOSED') {
      closedAtValue = null;
    }

    const tradeUpdate = await prisma.trade.update({
      where: { id: tradeId },
      data: {
        status: newStatus,
        direction: direction ?? tradeById.direction,
        paire: paire ?? tradeById.paire,
        entryPrice: entryPrice ?? tradeById.entryPrice,
        risk_amount: risk_amount ?? tradeById.risk_amount,
        size_lot: size_lot ?? tradeById.size_lot,
        takeProfit: takeProfit ?? tradeById.takeProfit,
        stopLoss: stopLoss ?? tradeById.stopLoss,
        exitPrice: exitPrice ?? tradeById.exitPrice,
        result: result ?? tradeById.result,
        closedAt: closedAtValue,
      },
    });

    return res.status(200).json({
      success: true,
      tradeUpdate,
      capitalHistoryEntry,
      deleteEntryCapitalHistory,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du trade.', details: error.message });
  }
}


export async function deleteTradeById(req , res) {
  const userId = req.user.id;
  const tradeId = Number(req.params.id);

  const findTradeId = await prisma.trade.findUnique({where:{id: tradeId}});

  if (!findTradeId) {
    return res.status(404).json({error: 'Aucuns trade trouvé !'});
  }

  if (findTradeId.userId !== userId) {
    return res.status(403).json({error: `Vous n'avez pas accès ou le trade ne vous appartient pas !`})
  }

  if (findTradeId.status === 'CLOSED') {
    const capitalHistory = await prisma.capital_history.findFirst({where:{source_trade_id: tradeId}});

    if (capitalHistory) {
      const portefeuille = await prisma.portefeuille.findUnique({where:{userId: userId}});
      if (portefeuille) {
        const newCapital = (portefeuille.capital_actuel) - (capitalHistory.variation);

        if (newCapital < 0 ) {
          return res.status(404).json({error: 'Erreur le capital ne peut pas etre inferieur a 0'})
        }

        await prisma.portefeuille.update({
          where:{userId: userId},
          data: {
            capital_actuel: newCapital
          }
        })

        await prisma.capital_history.delete({where:{id: capitalHistory.id}});
      }
      
    }
  }

  await prisma.trade.delete({where:{id: tradeId}});


  return res.status(200).json({success: true , })
}


export async function getAllTrades(req , res) {
  const userId = req.user.id;

  try {
    const allTrades = await prisma.trade.findMany({ where: { userId } });
    
    if (allTrades.length === 0) {
      return res.status(200).json({ success: true, allTrades: [] });
    }

    res.status(200).json({ success: true, allTrades });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function getTradeById(req , res) {
  const userId = req.user.id;
  const tradeId = Number(req.params.id);

  const tradeById = await prisma.trade.findUnique({where:{id: tradeId}});

  if (!tradeById) {
    return res.status(404).json({error: 'Trade introuvable !'});
  }

  if (tradeById.userId !== userId) {
    return res.status(403).json({error: 'Accès non autorisé pour ce trade !'})
  }

  return res.status(200).json({success: true , trade: tradeById});
}

export async function getLastTrade(req , res) {
  const userId = req.user.id;

  const lastTrades = await prisma.trade.findMany({
    where:{
      userId , 
      status: 'CLOSED'
    },
    orderBy: {
      closedAt: 'desc'
    },
    take: 7,
    select: {
      id: true, 
      createdAt: true,
      closedAt: true,
      paire: true,
      direction: true,
      result: true,
      risk_amount: true,
      status: true
    }
  });

  return res.status(200).json({success: true , lastTrades})
}