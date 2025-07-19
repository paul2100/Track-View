export function getStartDateByPeriod(period) {
  const now = new Date();

  switch (period) {
    case 'week': {
      const day = now.getDay();
      const diff = (day === 0 ? 6 : day - 1);
      const monday = new Date(now);
      monday.setDate(now.getDate() - diff);
      monday.setHours(0, 0, 0, 0);
      return monday;
    }
    case 'month': {
      const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return firstDayMonth;
    }
    case 'year': {
      const firstDayYear = new Date(now.getFullYear(), 0, 1);
      return firstDayYear;
    }
    default:
      return null;
  }
}
