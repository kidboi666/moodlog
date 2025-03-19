import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useJournal } from '@/core/store/hooks/useJournal';
import { StatisticsStore } from '@/core/types/store';
import { Nullable } from '@/core/types/utils';
import { MONTHS } from '@/core/constants/date';
import {
  EmotionStats,
  ExpressiveMonthStats,
  Journal,
  JournalStats,
  ScoreBoard,
  SelectedMonthStats,
  SignatureEmotion,
} from '@/core/types/entries';
import { EmotionLevel } from '@/core/types/enums';
import { getDayInISODateString } from '@/core/utils/common';
import { ISOMonthString } from '@/core/types/dtos/date';
import { useDate } from '@/core/store/hooks/useDate';

const INITIAL_JOURNAL_STATS = {
  totalCount: 0,
  totalFrequency: 0,
  totalActiveDay: '',
  monthlyCounts: {},
};

const INITIAL_EMOTION_STATS = {
  signatureEmotion: {
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

export const StatisticsContext = createContext<Nullable<StatisticsStore>>(null);

export const StatisticsContextProvider = ({ children }: PropsWithChildren) => {
  const { journals, monthlyJournals } = useJournal('statistic');
  const { selectedYear, selectedMonth } = useDate('statistic');
  const [journalStats, setJournalStats] = useState<JournalStats>(
    INITIAL_JOURNAL_STATS,
  );
  const [selectedMonthStats, setSelectedMonthStats] =
    useState<Nullable<SelectedMonthStats>>(null);
  const [expressiveMonthStats, setExpressiveMonthStats] =
    useState<ExpressiveMonthStats>({
      month: '0000-00',
      count: 0,
    });
  const [emotionStats, setEmotionStats] = useState<EmotionStats>(
    INITIAL_EMOTION_STATS,
  );
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
          return { month, count };
        }
        return highest;
      },
      { month: '', count: 0 },
    );
  }, [getMonthlyCounts]);

  /**
   * 감정 평균 구하기
   */
  const getTotalEmotionAverage = useCallback((selectedJournals: Journal[]) => {
    const emotions = selectedJournals.map(journal => journal.emotion);

    const scoreBoard: ScoreBoard = {
      sad: { count: 0, score: 0 },
      angry: { count: 0, score: 0 },
      happy: { count: 0, score: 0 },
      peace: { count: 0, score: 0 },
    };

    emotions.forEach(emotion => {
      switch (emotion.level) {
        case EmotionLevel.ZERO: {
          scoreBoard[emotion.type] = {
            count: scoreBoard[emotion.type].count + 1,
            score: scoreBoard[emotion.type].score + 1,
          };
          return;
        }
        case EmotionLevel.HALF: {
          scoreBoard[emotion.type] = {
            count: scoreBoard[emotion.type].count + 1,
            score: scoreBoard[emotion.type].score + 2,
          };
          return;
        }
        case EmotionLevel.FULL: {
          scoreBoard[emotion.type] = {
            count: scoreBoard[emotion.type].count + 1,
            score: scoreBoard[emotion.type].score + 3,
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
  const getSignatureEmotion = useCallback((scoreBoard: ScoreBoard) => {
    const initialValue: SignatureEmotion = {
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
    setJournalStats({
      totalFrequency,
      totalActiveDay,
      totalCount,
      monthlyCounts,
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
      setSelectedMonthStats(null);
      return;
    }
    const currentFrequency = getJournalFrequency(monthlyJournals);
    const currentActiveDay = getMostActiveDay(monthlyJournals);
    const scoreBoard = getTotalEmotionAverage(monthlyJournals);
    const signatureEmotion = getSignatureEmotion(scoreBoard);
    setSelectedMonthStats({
      month: selectedMonth,
      count: monthlyJournals.length,
      frequency: currentFrequency,
      activeDay: currentActiveDay,
      signatureEmotion,
    });
  }, [
    getJournalFrequency,
    getMostActiveDay,
    getTotalEmotionAverage,
    getSignatureEmotion,
    monthlyJournals,
    selectedMonth,
  ]);

  const getExpressiveMonthStats = useCallback(() => {
    const expressiveMonth = getExpressiveMonth();
    setExpressiveMonthStats({
      month: expressiveMonth.month as ISOMonthString,
      count: expressiveMonth.count,
    });
  }, [getExpressiveMonth]);

  const getEmotionStats = useCallback(() => {
    const scoreBoard = getTotalEmotionAverage(journals);
    const signatureEmotion = getSignatureEmotion(scoreBoard);
    setEmotionStats({
      scoreBoard,
      signatureEmotion,
    });
  }, [getTotalEmotionAverage, getSignatureEmotion, journals]);

  useEffect(() => {
    if (selectedYear) {
      getJournalStats();
      getEmotionStats();
      getExpressiveMonthStats();
    }
  }, [selectedYear, getJournalStats, getEmotionStats, getExpressiveMonthStats]);

  useEffect(() => {
    getMonthlyStats();
  }, [selectedMonth, getMonthlyStats]);

  return (
    <StatisticsContext.Provider
      value={useMemo(
        () => ({
          journalStats,
          emotionStats,
          selectedMonthStats,
          expressiveMonthStats,
        }),
        [journalStats, emotionStats, selectedMonthStats, expressiveMonthStats],
      )}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
