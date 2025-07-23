import prisma from '../prisma/client.js';
import { getStartDateByPeriod } from '../utils.js';

export async function getAverageTimeTrade(req, res) {
  const userId = req.user.id;

  const tradeUser = await prisma.trade.findMany({
    where: { userId },
  });

  if (!tradeUser || tradeUser.length === 0) {
    return res.status(200).json({ success: true, averageTime: null, message: 'Aucun trade trouvé' });
  }

  const closedTrades = tradeUser.filter(trade =>
    trade.status === 'CLOSED' &&
    trade.createdAt &&
    trade.closedAt
  );

  if (closedTrades.length === 0) {
    return res.status(200).json({ success: true, averageTime: null, message: 'Aucun trade fermé avec dates valides' });
  }

  const durations = closedTrades.map(trade => {
    const entry = new Date(trade.createdAt);
    const exit = new Date(trade.closedAt);
    return exit - entry;
  });

  const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
  const averageDuration = totalDuration / durations.length;

  const averageInHours = averageDuration / (1000 * 60 * 60);
  const days = Math.floor(averageInHours / 24);
  const hours = Math.round(averageInHours % 24);

  return res.status(200).json({
    success: true,
    averageTime: `${days} days and ${hours} hours`,
  });
}


export async function getSuccesRate(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  try {
    const trades = await prisma.trade.findMany({
      where: {
        userId,
        status: 'CLOSED',
        closedAt: {
          gte: startDate,
        },
      },
    });

    if (trades.length === 0) {
      return res.status(200).json({ success: true, pourcentageSuccesRate: 0, message: "Aucun trade fermé dans cette période" });
    }

    const positiveTrades = trades.filter(t => t.result > 0);
    const ratio = (positiveTrades.length / trades.length) * 100;
    const pourcentageSuccesRate = Number(ratio.toFixed(2));

    return res.status(200).json({ success: true, pourcentageSuccesRate });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function getTotalTrades(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  try {
    const totalTrade = await prisma.trade.count({
      where: {
        userId,
        status: 'CLOSED',
        closedAt: { gte: startDate }
      }
    });

    return res.status(200).json({ success: true, totalTrade });

  } catch (error) {
    console.error('Erreur getTotalTrades:', error);
    return res.status(500).json({ error: "Erreur lors de la récupération des trades." });
  }
}


export async function getMaxDrawdown(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  if (!startDate) {
    return res.status(400).json({ error: "Période invalide (week, month, year)" });
  }

  try {
    const trades = await prisma.trade.findMany({
      where: {
        userId,
        status: 'CLOSED',
        closedAt: { gte: startDate }
      },
      orderBy: { closedAt: 'asc' }
    });

    if (!trades || trades.length === 0) {
      return res.status(200).json({ success: true, maxDrawdown: null, message: 'Aucun trade trouvé' });
    }

    let equity = 0;
    let peak = 0;
    let maxDrawdown = 0;

    for (const trade of trades) {
      equity += trade.result;
      if (equity > peak) peak = equity;

      const drawdown = peak - equity;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }

    return res.status(200).json({ success: true, maxDrawdown: Number(maxDrawdown.toFixed(2))});

  } catch (error) {
    console.error("Erreur getMaxDrawdown:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}


export async function getWinTrade(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: 'CLOSED',
      closedAt: { gte: startDate }
    }
  });

  if (!trades || trades.length === 0) {
    return res.status(200).json({ success: true, winCount: 0, message: 'Aucun trade trouvé' });
  }

  const tradeGagnant = trades.filter(t => t.result > 0);
  const winCount = tradeGagnant.length;

  return res.status(200).json({ success: true, winCount });
}


export async function getLossTrade(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: 'CLOSED',
      closedAt: { gte: startDate }
    }
  });

  if (!trades || trades.length === 0) {
    return res.status(200).json({ success: true, lostCount: 0, message: 'Aucun trade trouvé' });
  }

  const tradePerdant = trades.filter(t => t.result < 0);
  const lostCount = tradePerdant.length;

  return res.status(200).json({ success: true, lostCount });
}


export async function getMaxWin(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: 'CLOSED',
      closedAt: { gte: startDate }
    }
  });

  if (!trades || trades.length === 0) {
    return res.status(200).json({ success: true, bestResult: null, message: 'Aucun trade trouvé' });
  }

  const tradeGagnant = trades.filter(t => t.result > 0);
  const results = tradeGagnant.map(t => t.result);

  if (results.length === 0) {
    return res.status(200).json({ success: true, bestResult: null, message: 'Aucun trade gagnant trouvé' });
  }

  const bestResult = Math.max(...results);

  return res.status(200).json({ success: true, bestResult });
}


export async function getMaxLost(req, res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: 'CLOSED',
      closedAt: { gte: startDate }
    }
  });

  if (!trades || trades.length === 0) {
    return res.status(200).json({ success: true, worstResult: null, message: 'Aucun trade trouvé' });
  }

  const tradePerdant = trades.filter(t => t.result < 0);
  const results = tradePerdant.map(t => t.result);

  if (results.length === 0) {
    return res.status(200).json({ success: true, worstResult: null, message: 'Aucun trade perdant trouvé' });
  }

  const worstResult = Math.min(...results);

  return res.status(200).json({ success: true, worstResult });
}


export async function getCapitalHistory(req , res) {
  const userId = req.user.id;

  const portefeuilleUser = await prisma.portefeuille.findUnique({
    where:{userId} ,
    select: {
      createdAt: true,
      solde_initial: true
    } 
  });

  if (!portefeuilleUser) {
    return res.status(404).json({error: `L'user n'a pas de portefeuille !`});
  }
  
  const capital_history = await prisma.capital_history.findMany({
  where: {
    userId,
    trade: {
      status: 'CLOSED' 
    }
  },
  orderBy: {
    createdAt: 'asc'
  },
  select: {
    createdAt: true,
    capital: true
  }
});


const capitalEvolution = [
  {
    createdAt: portefeuilleUser.createdAt,
    capital: Number(portefeuilleUser.solde_initial)
  },
  ...capital_history
];


return res.status(200).json({success: true , capitalEvolution})


}

export async function getPnl(req , res) {
  const userId = req.user.id;
  const { period } = req.query;
  const startDate = getStartDateByPeriod(period);


  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: 'CLOSED',
      closedAt: { gte: startDate }
    }
  });

  if (!trades || trades.length === 0) {
  return res.status(200).json({ success: true, totalPNL: 0, averagePNL: 0, message: 'Aucun trade trouvé' });
}

const pnlTotal = trades.reduce((acc , trade) => acc + trade.result, 0);

return res.status(200).json({success: true , pnlTotal: Number(pnlTotal.toFixed(2))});
}


export async function getRewardRisk(req , res) {
  const userId = req.user.id;
  const {period} = req.query

  const startDate = getStartDateByPeriod(period);

  const trades = await prisma.trade.findMany({
    where: {
      userId,
      status: 'CLOSED',
      closedAt: {gte: startDate}
    },
  });

  if (trades.length === 0 || !trades) {
    return res.status(200).json({success: true , message: `Aucuns trade fermer ou appartenant à l'utilisateur.`});
  }

 const tradeValide = trades.filter((trade) => trade.risk_amount > 0);

if (!tradeValide) {
  return res.status(404).json({error: 'erreur zeub'})
}
 
const rMultiple = tradeValide.map(trade => trade.result / trade.risk_amount);

const sumRMultiple = rMultiple.reduce((acc, val) => acc + val, 0);
const averageRR = Number((sumRMultiple / tradeValide.length).toFixed(2));




  return res.status(200).json({success: true , rewardRisk: averageRR})
}



export async function getPnlChart(req, res) {
  const userId = req.user.id;
  const { period } = req.query;

  const startDate = getStartDateByPeriod(period);

  try {
    const capitalHistory = await prisma.capital_history.findMany({
      where: {
        userId,
        createdAt: { gte: startDate },
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        createdAt: true,
        variation: true,
      },
    });

    if (!capitalHistory || capitalHistory.length === 0) {
      return res.status(200).json({ message: "Aucune variation trouvée !" });
    }

    const result = capitalHistory.map(item => ({
      date: new Date(item.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
      }),
      pnl: Number(item.variation),
    }));

    return res.status(200).json({ success: true, pnlVariations: result });
  } catch (error) {
    console.error("Erreur getPnlChart:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
