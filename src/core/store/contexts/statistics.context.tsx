import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { MONTHS } from '@/core/constants/date';
import { getDayInISODateString } from '@/core/utils/common';
import { ISOMonthString } from '@/types/date.types';
import { ScoreBoard } from '@/types/statistic.types';
import { Journal } from '@/types/journal.types';
import { MoodLevel, SignatureMood } from '@/types/mood.types';
import { statisticsReducer } from '@/core/store/reducers/statistics.reducer';
import {
  StatisticsState,
  StatisticsStore,
} from '@/core/store/types/statistics.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useDate } from '@/core/store/contexts/date.context';

const INITIAL_JOURNAL_STATS = {
  totalCount: 0,
  totalFrequency: 0,
  totalActiveDay: '',
  monthlyCounts: {},
};

const INITIAL_MOOD_STATS = {
  signatureMood: {
    type: '',
    count: 0,
    score: 0,
  },
  scoreBoard: {
    sad: {
      count: 0,
      score: 0,
    },
    angry: {
      count: 0,
      score: 0,
    },
    happy: {
      count: 0,
      score: 0,
    },
    peace: {
      count: 0,
      score: 0,
    },
  },
};

const initialState: StatisticsState = {
  journalStats: INITIAL_JOURNAL_STATS,
  moodStats: INITIAL_MOOD_STATS,
  selectedMonthStats: null,
  expressiveMonthStats: {
    currentMonth: '0000-00',
    count: 0,
  },
};

export const StatisticsContext = createContext<Nullable<StatisticsStore>>(null);

export const StatisticsContextProvider = ({ children }: PropsWithChildren) => {
  const { journals, monthlyJournals } = useJournal();
  const { selectedYear, selectedMonth } = useDate();
  const [state, dispatch] = useReducer(statisticsReducer, initialState);

  /**
   * 작성한 모든 일기의 갯수 가져오기
   */
  const getTotalCount = useCallback(() => {
    return journals.length;
  }, [journals.length]);

  /**
   * 각 달마다 작성한 일기의 갯수 가져오기
   */
  const getMonthlyCounts = useCallback(() => {
    return Object.fromEntries(
      Array.from({ length: Object.keys(MONTHS).length }, (_, i) => {
        const date =
          `${selectedYear}-${(i + 1).toString().padStart(2, '0')}` as ISOMonthString;
        return [
          date,
          journals.filter(journal => journal.localDate.startsWith(date)).length,
        ];
      }),
    );
  }, [journals, selectedYear]);

  /**
   * 가장 많은 일기를 작성한 달과 갯수 가져오기
   */
  const getExpressiveMonth = useCallback(() => {
    const monthlyCounts = getMonthlyCounts();
    return Object.entries(monthlyCounts).reduce(
      (highest, [month, count]) => {
        if (count > highest.count) {
          return { month: currentMonth, count };
        }
        return highest;
      },
      { month: '', count: 0 },
    );
  }, [getMonthlyCounts]);

  /**
   * 감정 평균 구하기
   */
  const getTotalMoodAverage = useCallback((selectedJournals: Journal[]) => {
    const moods = selectedJournals.map(journal => journal.mood);

    const scoreBoard: ScoreBoard = {
      sad: { count: 0, score: 0 },
      angry: { count: 0, score: 0 },
      happy: { count: 0, score: 0 },
      peace: { count: 0, score: 0 },
    };

    moods.forEach(mood => {
      switch (mood?.level) {
        case MoodLevel.ZERO: {
          scoreBoard[mood.type] = {
            count: scoreBoard[mood.type].count + 1,
            score: scoreBoard[mood.type].score + 1,
          };
          return;
        }
        case MoodLevel.HALF: {
          scoreBoard[mood.type] = {
            count: scoreBoard[mood.type].count + 1,
            score: scoreBoard[mood.type].score + 2,
          };
          return;
        }
        case MoodLevel.FULL: {
          scoreBoard[mood.type] = {
            count: scoreBoard[mood.type].count + 1,
            score: scoreBoard[mood.type].score + 3,
          };
          return;
        }
        default:
          return;
      }
    });

    return scoreBoard;
  }, []);

  /**
   * 대표 감정 가져오기
   */
  const getSignatureMood = useCallback((scoreBoard: ScoreBoard) => {
    const initialValue: SignatureMood = {
      type: '',
      count: 0,
      score: 0,
    };
    return Object.entries(scoreBoard).reduce((highest, [type, data]) => {
      if (!highest.type || data.score > highest.score) {
        return {
          type,
          count: data.count,
          score: data.score,
        };
      }
      return highest;
    }, initialValue);
  }, []);

  /**
   * 일기 작성 빈도 가져오기
   */
  const getJournalFrequency = useCallback((Journals: Journal[]) => {
    const dates = Journals.map(journal =>
      parseInt(journal.localDate.split('-')[2]),
    ).sort((a, b) => a - b);
    let frequency: Record<string, number> = {};

    if (dates.length === 0) return 0;

    dates.reduce((acc, date) => {
      const diffNum = date - acc;
      if (diffNum !== 0) {
        frequency[diffNum] = (frequency[diffNum] || 0) + 1;
      }
      return date;
    }, dates[0]);

    if (Object.keys(frequency).length === 0) return 0;

    return parseInt(
      Object.entries(frequency).reduce(
        (acc, [num, count]) => (count > frequency[acc] ? num : acc),
        Object.keys(frequency)[0],
      ),
    );
  }, []);

  /**
   * 가장 자주 일기를 작성한 요일 가져오기
   */
  const getMostActiveDay = useCallback((Journals: Journal[]) => {
    const days = Journals.map(journal =>
      getDayInISODateString(journal.localDate),
    );
    const frequency: Record<string, number> = {};

    days.forEach(day => {
      frequency[day] = (frequency[day] || 0) + 1;
    });

    if (Object.keys(frequency).length === 0) return '';

    return Object.entries(frequency).reduce(
      (acc, [day, count]) => (count > frequency[acc] ? day : acc),
      Object.keys(frequency)[0],
    );
  }, []);

  const getJournalStats = useCallback(() => {
    const totalCount = getTotalCount();
    const monthlyCounts = getMonthlyCounts();
    const totalFrequency = getJournalFrequency(journals);
    const totalActiveDay = getMostActiveDay(journals);

    dispatch({
      type: 'SET_JOURNAL_STATS',
      payload: {
        totalFrequency,
        totalActiveDay,
        totalCount,
        monthlyCounts,
      },
    });
  }, [
    getTotalCount,
    getMonthlyCounts,
    getJournalFrequency,
    getMostActiveDay,
    journals,
  ]);

  const getMonthlyStats = useCallback(() => {
    if (!selectedMonth) {
      dispatch({
        type: 'SET_SELECTED_MONTH_STATS',
        payload: null,
      });
      return;
    }

    const currentFrequency = getJournalFrequency(monthlyJournals);
    const currentActiveDay = getMostActiveDay(monthlyJournals);
    const scoreBoard = getTotalMoodAverage(monthlyJournals);
    const signatureMood = getSignatureMood(scoreBoard);

    dispatch({
      type: 'SET_SELECTED_MONTH_STATS',
      payload: {
        month: selectedMonth,
        count: monthlyJournals.length,
        frequency: currentFrequency,
        activeDay: currentActiveDay,
        signatureMood: signatureMood,
      },
    });
  }, [
    getJournalFrequency,
    getMostActiveDay,
    getTotalMoodAverage,
    getSignatureMood,
    monthlyJournals,
    selectedMonth,
  ]);

  const getExpressiveMonthStats = useCallback(() => {
    const expressiveMonth = getExpressiveMonth();

    dispatch({
      type: 'SET_EXPRESSIVE_MONTH_STATS',
      payload: {
        month: expressiveMonth.month as ISOMonthString,
        count: expressiveMonth.count,
      },
    });
  }, [getExpressiveMonth]);

  const getMoodStats = useCallback(() => {
    const scoreBoard = getTotalMoodAverage(journals);
    const signatureMood = getSignatureMood(scoreBoard);

    dispatch({
      type: 'SET_MOOD_STATS',
      payload: {
        scoreBoard,
        signatureMood: signatureMood,
      },
    });
  }, [getTotalMoodAverage, getSignatureMood, journals]);

  useEffect(() => {
    if (selectedYear) {
      getJournalStats();
      getMoodStats();
      getExpressiveMonthStats();
    }
  }, [selectedYear, getJournalStats, getMoodStats, getExpressiveMonthStats]);

  useEffect(() => {
    getMonthlyStats();
  }, [selectedMonth, getMonthlyStats]);

  // Context 값
  const contextValue = useMemo(
    () => ({
      journalStats: state.journalStats,
      moodStats: state.moodStats,
      selectedMonthStats: state.selectedMonthStats,
      expressiveMonthStats: state.expressiveMonthStats,
    }),
    [
      state.journalStats,
      state.moodStats,
      state.selectedMonthStats,
      state.expressiveMonthStats,
    ],
  );

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error(
      'useStatistics must be used within a StatisticsContextProvider',
    );
  }
  return context;
};
