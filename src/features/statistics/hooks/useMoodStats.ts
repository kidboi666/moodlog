import { useMemo } from 'react';
import { StatisticsService } from '@/core/services/statistics.service';
import { ISODateString, ISOMonthString } from '@/types/date.types';
import { TimeRange } from '@/types/statistic.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { CalendarUtils } from 'react-native-calendars';

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
  selectedDate?: ISODateString,
) => {
  const { journals, indexes, isLoading } = useJournal();

  const yearlyStats = useMemo(
    () =>
      StatisticsService.getYearlyStats(
        journals,
        indexes,
        timeRange,
        selectedYear,
      ),
    [journals, indexes, timeRange, selectedYear],
  );

  const monthlyStats = useMemo(
    () =>
      StatisticsService.getMonthlyStats(
        journals,
        indexes,
        timeRange,
        selectedMonth,
      ),
    [journals, indexes, timeRange, selectedMonth],
  );

  const weeklyStats = useMemo(
    () =>
      StatisticsService.getWeeklyStats(
        journals,
        indexes,
        selectedDate || CalendarUtils.getCalendarDateString(new Date()),
      ),
    [journals, indexes, selectedDate],
  );

  const initialStats = (timeRange: TimeRange) => {
    switch (timeRange) {
      case TimeRange.YEARLY:
        return yearlyStats;
      case TimeRange.MONTHLY:
        return monthlyStats;
      case TimeRange.WEEKLY:
        return weeklyStats;
      default:
        return yearlyStats;
    }
  };

  return {
    stats: initialStats(timeRange),
    isLoading,
  };
};
