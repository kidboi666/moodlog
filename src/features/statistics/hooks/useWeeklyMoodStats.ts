import { useJournal } from '@/core/store/contexts/journal.context';
import { useMemo } from 'react';
import { StatisticsService } from '@/core/services/statistics.service';
import { ISODateString } from '@/types/date.types';

export const useWeeklyMoodStats = (selectedDate: ISODateString) => {
  const { journals, indexes } = useJournal();

  const weeklyMoodStats = useMemo(
    () => StatisticsService.getWeeklyStats(journals, indexes, selectedDate),
    [journals, indexes, selectedDate],
  );

  return {
    stats: weeklyMoodStats,
  };
};
