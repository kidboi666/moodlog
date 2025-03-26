import {
  ExpressiveMonthStats,
  JournalStats,
  MoodStats,
  SelectedMonthStats,
} from '@/types/statistic.types';
import { Nullable } from '@/types/utill.types';

export type StatisticsState = {
  journalStats: JournalStats;
  moodStats: MoodStats;
  selectedMonthStats: Nullable<SelectedMonthStats>;
  expressiveMonthStats: ExpressiveMonthStats;
};

export type StatisticsAction =
  | { type: 'SET_JOURNAL_STATS'; payload: JournalStats }
  | { type: 'SET_MOOD_STATS'; payload: MoodStats }
  | { type: 'SET_SELECTED_MONTH_STATS'; payload: Nullable<SelectedMonthStats> }
  | { type: 'SET_EXPRESSIVE_MONTH_STATS'; payload: ExpressiveMonthStats };

export type StatisticsStore = {
  journalStats: JournalStats;
  moodStats: MoodStats;
  expressiveMonthStats: ExpressiveMonthStats;
  selectedMonthStats: Nullable<SelectedMonthStats>;
};
