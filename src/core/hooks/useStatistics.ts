import { useCallback, useState } from 'react';
import { MONTHS } from '@/core/constants/date';
import { getDayInISODateString } from '@/core/utils/common';
import { ISOMonthString } from '@/types/date.types';
import { ScoreBoard } from '@/types/statistic.types';
import { Journal } from '@/types/journal.types';
import { MoodLevel, SignatureMood } from '@/types/mood.types';
import { useJournal } from '@/core/store/contexts/journal.context';

const initialJournalStats = {
  totalCount: 0,
  totalFrequency: 0,
  totalActiveDay: '',
  monthlyCounts: {},
};

const initialMonthlyStats = {
  count: 0,
  frequency: 0,
  activeDay: '',
  signatureMood: {
    type: '',
    count: 0,
    score: 0,
  },
};

const initialWeeklyStats = {
  count: 0,
  frequency: 0,
  activeDay: '',
};

const initialMoodStats = {
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

export function useStatistics() {
  const { journals: journalsObj, isLoading } = useJournal();

  const [journalStats, setJournalStats] = useState(initialJournalStats);
  const [moodStats, setMoodStats] = useState(initialMoodStats);
  const [monthStats, setMonthStats] = useState(initialMonthlyStats);
  const [weeklyStats, setWeeklyStats] = useState(initialWeeklyStats);
  const [expressiveMonthStats, setExpressiveMonthStats] = useState({
    month: '0000-00' as ISOMonthString,
    count: 0,
  });

  const journals = useCallback(() => {
    return Object.values(journalsObj || {});
  }, [journalsObj]);

  const monthlyJournals = useCallback(
    (selectedMonth: ISOMonthString) => {
      if (!selectedMonth) return [];

      return journals().filter(
        journal =>
          journal.localDate && journal.localDate.startsWith(selectedMonth),
      );
    },
    [journals],
  );

  /**
   * 작성한 모든 일기의 갯수 가져오기
   */
  const getTotalCount = useCallback(() => {
    return journals().length;
  }, [journals]);

  /**
   * 각 달마다 작성한 일기의 갯수 가져오기
   */
  const getMonthlyCounts = useCallback(
    (selectedYear: number) => {
      return Object.fromEntries(
        Array.from({ length: Object.keys(MONTHS).length }, (_, i) => {
          const date =
            `${selectedYear}-${(i + 1).toString().padStart(2, '0')}` as ISOMonthString;
          return [
            date,
            journals().filter(journal => journal.localDate.startsWith(date))
              .length,
          ];
        }),
      );
    },
    [journals],
  );

  /**
   * 가장 많은 일기를 작성한 달과 갯수 가져오기
   */
  const getExpressiveMonth = useCallback(
    (selectedYear: number) => {
      const monthlyCounts = getMonthlyCounts(selectedYear);
      return Object.entries(monthlyCounts).reduce(
        (highest, [month, count]) => {
          if (count > highest.count) {
            return { month, count };
          }
          return highest;
        },
        { month: '', count: 0 },
      );
    },
    [getMonthlyCounts],
  );

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
      if (!mood || !mood.type) return;

      switch (mood.level) {
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

  const calculateJournalStats = useCallback(
    (selectedYear: number) => {
      const allJournals = journals();
      const totalCount = getTotalCount();
      const monthlyCounts = getMonthlyCounts(selectedYear);
      const totalFrequency = getJournalFrequency(allJournals);
      const totalActiveDay = getMostActiveDay(allJournals);

      setJournalStats({
        totalFrequency,
        totalActiveDay,
        totalCount,
        monthlyCounts,
      });
    },
    [
      getTotalCount,
      getMonthlyCounts,
      getJournalFrequency,
      getMostActiveDay,
      journals,
    ],
  );

  const calculateMonthlyStats = useCallback(
    (selectedMonth: ISOMonthString) => {
      if (!selectedMonth) {
        setMonthStats(initialMonthlyStats);
        return;
      }

      const currentMonthJournals = monthlyJournals(selectedMonth);
      const currentFrequency = getJournalFrequency(currentMonthJournals);
      const currentActiveDay = getMostActiveDay(currentMonthJournals);
      const scoreBoard = getTotalMoodAverage(currentMonthJournals);
      const signatureMood = getSignatureMood(scoreBoard);

      setMonthStats({
        count: currentMonthJournals.length,
        frequency: currentFrequency,
        activeDay: currentActiveDay,
        signatureMood: signatureMood,
      });
    },
    [
      getJournalFrequency,
      getMostActiveDay,
      getTotalMoodAverage,
      getSignatureMood,
      monthlyJournals,
    ],
  );

  const calculateExpressiveMonthStats = useCallback(
    (selectedYear: number) => {
      const expressiveMonth = getExpressiveMonth(selectedYear);

      setExpressiveMonthStats({
        month: expressiveMonth.month as ISOMonthString,
        count: expressiveMonth.count,
      });
    },
    [getExpressiveMonth],
  );

  const calculateMoodStats = useCallback(() => {
    const allJournals = journals();
    const scoreBoard = getTotalMoodAverage(allJournals);
    const signatureMood = getSignatureMood(scoreBoard);

    setMoodStats({
      scoreBoard,
      signatureMood: signatureMood,
    });
  }, [getTotalMoodAverage, getSignatureMood, journals]);

  const initStats = useCallback(
    (selectedYear: number) => {
      calculateJournalStats(selectedYear);
      calculateMoodStats();
      calculateExpressiveMonthStats(selectedYear);
    },
    [calculateJournalStats, calculateMoodStats, calculateExpressiveMonthStats],
  );

  return {
    journalStats,
    moodStats,
    monthStats,
    expressiveMonthStats,
    getJournals: journals,
    getMonthlyJournals: monthlyJournals,
    calculateJournalStats,
    calculateMonthlyStats,
    calculateMoodStats,
    calculateExpressiveMonthStats,
    initStats,
    isLoading,
  };
}
