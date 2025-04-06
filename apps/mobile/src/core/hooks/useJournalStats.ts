import { StatisticsService } from '@/core/services/statistics.service';
import { useJournal } from '@/core/store/contexts/journal.context';
import { ISOMonthString } from '@/types/date.types';
import { TimeRange } from '@/types/statistic.types';
import { useMemo } from 'react';

export function useJournalStats(
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) {
  const { journals, indexes, isLoading } = useJournal();

  const yearlyStats = useMemo(() => {
    return StatisticsService.getYearlyStats(
      journals,
      indexes,
      timeRange,
      selectedYear,
    );
  }, [journals, indexes, timeRange, selectedYear]);

  const monthlyStats = useMemo(() => {
    return StatisticsService.getMonthlyStats(
      journals,
      indexes,
      timeRange,
      selectedMonth,
    );
  }, [journals, indexes, timeRange, selectedMonth]);

  const stats = timeRange === TimeRange.YEARLY ? yearlyStats : monthlyStats;

  return {
    stats,
    isLoading,
  };
}
