import prisma from '../prisma/client.js';

const VALID_STATUS = ['OPEN', 'CLOSED', 'CANCELLED'];
const VALID_DIRECTIONS = ['LONG', 'SHORT'];

export async function createTrade(req, res) {
  const userId = req.user.id;
  const {status,direction,paire,ratio_risk,result,size_lot,takeProfit,stopLoss,exitPrice,entryPrice} = req.body;

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
        ratio_risk: ratio_risk ?? null,
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
    console.error('Erreur createTrade:', error);
    return res.status(500).json({ error: "Erreur serveur lors de la création du trade." });
  }
}

export async function updateTrade(req, res) {
  const userId = req.user.id;
  const tradeId = Number(req.params.id);
  const {status,direction,paire,ratio_risk,result,size_lot,takeProfit,stopLoss,exitPrice,entryPrice} = req.body;

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
      const variation = newResult - oldResult;
      newCapital += variation;

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
            variation,
            capital: newCapital.toString(),
          },
        });
      }
    }

    const tradeUpdate = await prisma.trade.update({
      where: { id: tradeId },
      data: {
        status: newStatus,
        direction: direction ?? tradeById.direction,
        paire: paire ?? tradeById.paire,
        entryPrice: entryPrice ?? tradeById.entryPrice,
        ratio_risk: ratio_risk ?? tradeById.ratio_risk,
        size_lot: size_lot ?? tradeById.size_lot,
        takeProfit: takeProfit ?? tradeById.takeProfit,
        stopLoss: stopLoss ?? tradeById.stopLoss,
        exitPrice: exitPrice ?? tradeById.exitPrice,
        result: result ?? tradeById.result,
      },
    });

    return res.status(200).json({
      success: true,
      tradeUpdate,
      capitalHistoryEntry,
      deleteEntryCapitalHistory,
    });
  } catch (error) {
    console.error('Erreur updateTrade:', error);
    return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du trade.', details: error.message });
  }
}


export async function getTotalTrades(req, res) {
  const userId = req.user.id;

  try {
    const totalTrade = await prisma.trade.count({ where: { userId } });
    return res.status(200).json({ success: true, totalTrade });
  } catch (error) {
    console.error('Erreur getTotalTrades:', error);
    return res.status(500).json({ error: "Erreur lors de la récupération des trades." });
  }
}
