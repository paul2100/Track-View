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
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    case 'year': {
      return new Date(now.getFullYear(), 0, 1);
    }
    default:
      return null;
  }
}

export function getEndDateByPeriod(period) {
  const now = new Date();

  switch (period) {
    case 'week': {
      const day = now.getDay();
      const diff = (day === 0 ? 6 : day - 1);
      const monday = new Date(now);
      monday.setDate(now.getDate() - diff);
      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      return sunday;
    }
    case 'month': {
      const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const lastDayMonth = new Date(firstDayNextMonth - 1); // le jour avant le premier jour du mois suivant
      lastDayMonth.setHours(23, 59, 59, 999);
      return lastDayMonth;
    }
    case 'year': {
      const lastDayYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      return lastDayYear;
    }
    default:
      return null;
  }
}

