import { STORAGE_KEY } from '@/core/constants/storage';
import { Journal, Journals } from '@/types/journal.types';
import { StorageService } from '@/core/store/services/storage.service';
import { uuid } from 'expo-modules-core';
import { CalendarUtils } from 'react-native-calendars';
import {
  getISODateString,
  getLastDate,
  getMonthFromDate,
} from '@/core/utils/common';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import { Indexes, JournalState } from '@/core/store/types/journal.types';

import { Draft } from '@/types/draft.types';

export class JournalService extends StorageService {
  static async loadJournals(): Promise<Journal[]> {
    try {
      const newJournals = await this.load(STORAGE_KEY.JOURNALS);
      return newJournals ? newJournals : [];
    } catch (err) {
      throw err;
    }
  }

  static async saveJournals(journals: JournalState): Promise<void> {
    try {
      await this.save(STORAGE_KEY.JOURNALS, journals);
    } catch (err) {
      throw err;
    }
  }

  static async addJournal(
    journals: Journals,
    indexes: Indexes,
    draft: Draft,
  ): Promise<JournalState> {
    if (!draft.content || !draft.mood) {
      throw new Error('not content or mood');
    }
    try {
      const localDate = CalendarUtils.getCalendarDateString(new Date());
      const monthString = getMonthFromDate(localDate);

      const newJournal = {
        id: uuid.v4(),
        content: draft.content,
        mood: draft.mood,
        createdAt: new Date().toISOString(),
        localDate,
        imageUri: draft.imageUri ? draft.imageUri : null,
      };

      const newState = {
        journals: {
          ...journals,
          [newJournal.id]: newJournal,
        },
        indexes: {
          ...indexes,
          byMonth: {
            ...indexes.byMonth,
            [monthString]: [
              ...(indexes.byMonth[monthString] || []),
              newJournal.id,
            ],
          },
          byDate: {
            ...indexes.byDate,
            [localDate]: [...(indexes.byDate[localDate] || []), newJournal.id],
          },
        },
      };

      await this.saveJournals(newState);

      return newState;
    } catch (err) {
      throw err;
    }
  }

  static async removeJournal(
    journals: Journal[],
    journalId: string,
  ): Promise<Journal[]> {
    try {
      const newJournals = journals.filter(journal => journal.id !== journalId);
      await this.saveJournals(newJournals);
      return newJournals;
    } catch (err) {
      throw err;
    }
  }

  static getCountForDate(
    journals: Journal[],
    year: number,
    month: number | string,
    date: number,
  ) {
    const dateString = getISODateString(year, month, date);
    const foundJournals = journals.filter(
      journal => journal.localDate === dateString,
    );

    return foundJournals.length;
  }

  static getMoodForDate(journals: Journal[], date: ISODateString) {
    const foundJournals = journals.filter(
      journal => journal.localDate === date,
    );

    return foundJournals.map(journal => journal.mood);
  }

  static getCountForMonth(
    journals: Journal[],
    year: number,
    month: number | string,
  ) {
    const lastDate = getLastDate(year, month);
    const counts: DateCounts = {};

    for (let day = 1; day <= lastDate; day++) {
      const dateKey = getISODateString(year, month, day);
      counts[dateKey] = 0;
    }

    journals.forEach(journal => {
      if (counts.hasOwnProperty(journal.localDate)) {
        counts[journal.localDate]++;
      }
    });

    return counts;
  }

  static getJournals(
    journals: Journals,
    indexes: Indexes,
    date: ISODateString | ISOMonthString | null,
  ) {
    if (!date) return null;
    const splitDate = date.split('-');

    if (splitDate?.[2]) {
      return this.getJournalsByDate(journals, indexes, date as ISODateString);
    }
    return this.getJournalsByMonth(journals, indexes, date as ISOMonthString);
  }

  static getJournalById(journals: Journals, journalId: string) {
    return journals[journalId] || null;
  }

  static getJournalsByDate(
    journals: Journals,
    indexes: Indexes,
    date: ISODateString,
  ) {
    const dailyJournalsIndex = indexes.byDate[date];
    if (dailyJournalsIndex.length === 0) {
      return date;
    }
    return dailyJournalsIndex.map(journalIndex => journals[journalIndex]);
  }

  static getJournalsByMonth(
    journals: Journals,
    indexes: Indexes,
    monthDate: ISOMonthString,
  ) {
    const monthlyJournalsIndex = indexes.byMonth[monthDate];
    if (monthlyJournalsIndex.length === 0) {
      return null;
    }
    return monthlyJournalsIndex.map(journalIndex => journals[journalIndex]);
  }
}
