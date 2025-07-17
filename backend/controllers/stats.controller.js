import prisma from '../prisma/client.js';

export async function getAverageTimeTrade(req, res) {
  const userId = req.user.id;

  const tradeUser = await prisma.trade.findMany({
    where: { userId: userId },
  });

  if (!tradeUser || tradeUser.length === 0) {
    return res.status(404).json({ error: 'Aucun trade trouvé' });
  }

  const closedTrades = tradeUser.filter(trade => trade.status === 'CLOSED');

  if (closedTrades.length === 0) {
    return res.status(404).json({ error: 'Aucun trade fermé trouvé' });
  }

  const durations = closedTrades.map(trade => {
    const entry = new Date(trade.entry_date);
    const exit = new Date(trade.exit_date);
    return exit - entry;
  });

  const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
  const averageDuration = totalDuration / durations.length;

  const averageInHours = averageDuration / (1000 * 60 * 60);
  const days = Math.floor(averageInHours / 24);
  const hours = Math.round(averageInHours % 24);

  return res.status(200).json({
    averageTime: `${days} days and ${hours} hours`,
  });
  
}
