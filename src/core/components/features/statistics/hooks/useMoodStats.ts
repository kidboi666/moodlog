import { useMemo } from 'react';
import { StatisticsService } from '@/core/services/statistics.service';
import { ISOMonthString } from '@/types/date.types';
import { TimeRange } from '@/types/statistic.types';
import { useJournal } from '@/core/store/contexts/journal.context';

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
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

  const initialStats = (timeRange: TimeRange) => {
    switch (timeRange) {
      case TimeRange.YEARLY:
        return yearlyStats;
      case TimeRange.MONTHLY:
        return monthlyStats;
      default:
        return yearlyStats;
    }
  };

  return {
    stats: initialStats(timeRange),
    isLoading,
  };
};
