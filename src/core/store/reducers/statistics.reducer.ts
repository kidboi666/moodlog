import {
  StatisticsAction,
  StatisticsState,
} from '@/core/store/types/statistics.types';

export const statisticsReducer = (
  state: StatisticsState,
  action: StatisticsAction,
) => {
  switch (action.type) {
    case 'SET_JOURNAL_STATS':
      return { ...state, journalStats: action.payload };
    case 'SET_MOOD_STATS':
      return { ...state, moodStats: action.payload };
    case 'SET_SELECTED_MONTH_STATS':
      return { ...state, selectedMonthStats: action.payload };
    case 'SET_EXPRESSIVE_MONTH_STATS':
      return { ...state, expressiveMonthStats: action.payload };
    default:
      return state;
  }
};
