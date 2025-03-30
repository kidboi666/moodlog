import { ISODateString, ISOMonthString } from '@/types/date.types';
import { ScoreBoard, TimeRange } from '@/types/statistic.types';
import { Journal, Journals } from '@/types/journal.types';
import { MoodLevel, SignatureMood } from '@/types/mood.types';
import {
  getDayFromISODate,
  getDaysBetweenDates,
  getISOMonthString,
  getThisWeekArray,
} from '@/utils/date';
import { JournalIndexes, MonthIndexes } from '@/core/store/types/journal.types';
import { castArray, extractKeys } from '@/utils/common';

export class StatisticsService {
  /**
   * 각 달마다 작성한 일기의 갯수 가져오기
   */
  static getMonthlyCounts(
    monthIndexes: MonthIndexes,
    selectedYear: number,
  ): Record<string, number> {
    return Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => {
        const monthString = getISOMonthString(selectedYear, i + 1);
        const monthData = monthIndexes[monthString] || [];
        return [monthString, monthData.length];
      }),
    );
  }

  /**
   * 가장 많은 일기를 작성한 달과 갯수 가져오기
   */
  static getExpressiveMonth(monthIndexes: MonthIndexes, selectedYear: number) {
    const monthlyCounts = this.getMonthlyCounts(monthIndexes, selectedYear);
    return Object.entries(monthlyCounts).reduce(
      (highest, [month, count]) => {
        if (count > highest.count) {
          return { month, count };
        }
        return highest;
      },
      { month: '', count: 0 },
    );
  }

  /**
   * 감정 평균 구하기
   */
  static calculateMoodScoreBoard(journals: Journal[]): ScoreBoard {
    const moods = journals.map(journal => journal.mood);

    const scoreBoard: ScoreBoard = {
      sad: { count: 0, score: 0 },
      angry: { count: 0, score: 0 },
      happy: { count: 0, score: 0 },
      peace: { count: 0, score: 0 },
    };

    const levelScores = {
      [MoodLevel.ZERO]: 1,
      [MoodLevel.HALF]: 2,
      [MoodLevel.FULL]: 3,
    };

    moods.forEach(mood => {
      if (!mood || !mood.type) return;

      const score = levelScores[mood.level] || 0;

      scoreBoard[mood.type] = {
        count: scoreBoard[mood.type].count + 1,
        score: scoreBoard[mood.type].score + score,
      };
    });

    return scoreBoard;
  }

  /**
   * 대표 감정 가져오기
   */
  static getSignatureMood(scoreBoard: ScoreBoard): SignatureMood {
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
  }

  /**
   * 작성 빈도를 구하기 위해 필요한 date 가져오기
   */
  static getISODateStringForFrequency(
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedTimeUnit: number | ISOMonthString,
  ) {
    let dates: string[];

    if (timeRange === TimeRange.MONTHLY) {
      const dateKeys = extractKeys(indexes.byDate);
      dates = dateKeys.flatMap(date =>
        date.startsWith(selectedTimeUnit as ISOMonthString)
          ? [date as ISODateString]
          : [],
      );
    } else {
      const dateKeys = extractKeys(indexes.byDate);
      dates = dateKeys.flatMap(date =>
        date.startsWith(selectedTimeUnit.toString())
          ? [date as ISODateString]
          : [],
      );
    }

    return dates.sort((a, b) => a.localeCompare(b));
  }

  /**
   * 일기 작성 빈도 가져오기
   */
  static getJournalFrequency(
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedTimeUnit: number | ISOMonthString,
  ): number {
    const dates = this.getISODateStringForFrequency(
      indexes,
      timeRange,
      selectedTimeUnit,
    );
    let frequency: Record<string, number> = {};

    if (dates.length === 0) return 0;

    dates.reduce((acc, date) => {
      const diffNum = getDaysBetweenDates(date, acc);
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
  }

  /**
   * 가장 자주 일기를 작성한 요일 가져오기
   */
  static getMostActiveDay(journals: Journals): string {
    const isArray = Array.isArray(journals);
    if (
      (isArray && journals.length === 0) ||
      (!isArray && Object.keys(journals).length === 0)
    ) {
      return '';
    }
    const castJournals = isArray ? journals : castArray(journals);

    const days = castJournals.map(journal =>
      getDayFromISODate(journal.localDate),
    );
    const frequency: Record<string, number> = {};

    days.forEach(day => {
      frequency[day] = (frequency[day] || 0) + 1;
    });

    return Object.entries(frequency).reduce(
      (acc, [day, count]) => (count > frequency[acc] ? day : acc),
      Object.keys(frequency)[0],
    );
  }

  /**
   * 연간 통계 계산
   */
  static getYearlyStats(
    journals: Journals,
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedYear: number,
  ) {
    const yearIds = indexes.byYear[selectedYear] || [];
    const yearlyJournals = yearIds
      .map(id => journals[id])
      .filter(journal => journal !== undefined);

    const expressiveMonth = this.getExpressiveMonth(
      indexes.byMonth,
      selectedYear,
    );
    const scoreBoard = this.calculateMoodScoreBoard(yearlyJournals);

    return {
      totalCount: yearlyJournals.length,
      frequency: this.getJournalFrequency(indexes, timeRange, selectedYear),
      activeDay: this.getMostActiveDay(journals),
      moodStats: {
        scoreBoard,
        signatureMood: this.getSignatureMood(scoreBoard),
      },
      expressiveMonth: {
        month: expressiveMonth.month as ISOMonthString,
        count: expressiveMonth.count,
      },
    };
  }

  /**
   * 월간 통계 계산
   */
  static getMonthlyStats(
    journals: Journals,
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedMonth: ISOMonthString,
  ) {
    const monthIds = indexes.byMonth[selectedMonth] || [];
    const monthlyJournals = monthIds
      .map(id => journals[id])
      .filter(journal => journal !== undefined);
    const scoreBoard = this.calculateMoodScoreBoard(monthlyJournals);

    return {
      totalCount: monthlyJournals.length,
      frequency: this.getJournalFrequency(indexes, timeRange, selectedMonth),
      activeDay: this.getMostActiveDay(journals),
      moodStats: {
        scoreBoard,
        signatureMood: this.getSignatureMood(scoreBoard),
      },
      expressiveMonth: {
        month: '0000-00' as ISOMonthString,
        count: 0,
      },
    };
  }

  /**
   * 주간 통계 계산
   */
  static getWeeklyStats(
    journals: Journals,
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedDate: ISODateString,
  ) {
    const dates = getThisWeekArray(selectedDate);
    const weekDate = dates.map(date => indexes.byDate[date]) || [];
    let eachDayJournals = {};
    weekDate.forEach(
      (date, index) => (eachDayJournals[index] = date.map(id => journals[id])),
    );

    return {
      totalCount: weeklyJournals.length,
      frequency: this.getJournalFrequency(indexes, timeRange, selectedDate),
      activeDay: this.getMostActiveDay(journals),
      moodStats: {
        scoreBoard,
        signatureMood: this.getSignatureMood(scoreBoard),
      },
      expressiveMonth: {
        month: '0000-00' as ISOMonthString,
        count: 0,
      },
    };
  }
}
