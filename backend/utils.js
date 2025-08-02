import { toZonedTime } from 'date-fns-tz';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear } from 'date-fns';

export function getStartDateByPeriod(period) {
  try {
    const date = new Date();
    const timeZone = 'Europe/Paris';

    switch (period) {
      case 'week': {
        const startWeek = startOfWeek(date, { weekStartsOn: 1 });
        return toZonedTime(startWeek, timeZone);
      }
      case 'month': {
        const startMonth = startOfMonth(date);
        return toZonedTime(startMonth, timeZone);
      }
      case 'year': {
        const startYear = startOfYear(date);
        return toZonedTime(startYear, timeZone);
      }
      default:
        return null;
    }
  } catch (error) {
    console.error('Erreur dans getStartDateByPeriod:', error);
    return null;
  }
}

export function getEndDateByPeriod(period) {
  try {
    const date = new Date();
    const timeZone = 'Europe/Paris';

    switch (period) {
      case 'week': {
        const endWeek = endOfWeek(date, { weekStartsOn: 1 });
        return toZonedTime(endWeek, timeZone);
      }
      case 'month': {
        const endMonth = endOfMonth(date);
        return toZonedTime(endMonth, timeZone);
      }
      case 'year': {
        const endYear = endOfYear(date);
        return toZonedTime(endYear, timeZone);
      }
      default:
        return null;
    }
  } catch (error) {
    console.error('Erreur dans getEndDateByPeriod:', error);
    return null;
  }
}