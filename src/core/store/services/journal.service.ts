import { STORAGE_KEY } from '@/core/constants/storage';
import { Journal, Journals } from '@/types/journal.types';
import { StorageService } from '@/core/store/services/storage.service';
import { uuid } from 'expo-modules-core';
import { CalendarUtils } from 'react-native-calendars';
import {
  getISODateString,
  getISOMonthString,
  getMonthFromDate,
} from '@/core/utils/common';
import { ISODateString, ISOMonthString, MonthKey } from '@/types/date.types';
import { JournalIndexes, JournalStore } from '@/core/store/types/journal.types';

import { Draft } from '@/types/draft.types';

export class JournalService extends StorageService {
  static async loadJournalStore(): Promise<JournalStore> {
    try {
      const newJournals = await this.load(STORAGE_KEY.JOURNAL_STORE);
      return newJournals ? newJournals : [];
    } catch (err) {
      throw err;
    }
  }

  static async saveJournalStore(journals: JournalStore): Promise<void> {
    try {
      await this.save(STORAGE_KEY.JOURNAL_STORE, journals);
    } catch (err) {
      throw err;
    }
  }

  static async addJournal(
    store: JournalStore,
    draft: Draft,
  ): Promise<JournalStore> {
    console.log(draft);
    if (!draft.content || !draft.mood) {
      throw new Error('not content or mood');
    }
    try {
      const localDate = CalendarUtils.getCalendarDateString(new Date());
      const monthString = getMonthFromDate(localDate);
      const moodType = draft.mood.type;

      const newJournal = {
        id: uuid.v4(),
        content: draft.content,
        mood: draft.mood,
        createdAt: new Date().toISOString(),
        localDate,
        imageUri: draft.imageUri ? draft.imageUri : null,
      };

      const newStore = {
        journals: {
          ...store.journals,
          [newJournal.id]: newJournal,
        },
        indexes: {
          ...store.indexes,
          byMonth: {
            ...store.indexes.byMonth,
            [monthString]: [
              ...(store.indexes.byMonth[monthString] || []),
              newJournal.id,
            ],
          },
          byDate: {
            ...store.indexes.byDate,
            [localDate]: [
              ...(store.indexes.byDate[localDate] || []),
              newJournal.id,
            ],
          },
          byMood: {
            ...store.indexes.byMood,
            [moodType]: [
              ...(store.indexes.byMood[moodType] || []),
              newJournal.id,
            ],
          },
        },
      };

      await this.saveJournalStore(newStore);

      return newStore;
    } catch (err) {
      throw err;
    }
  }

  static async removeJournal(
    store: JournalStore,
    journalId: string,
  ): Promise<JournalStore> {
    try {
      const journal = store.journals[journalId];
      if (!journal) {
        return { journals: store.journals, indexes: store.indexes };
      }
      const date = journal.localDate;
      const month = getMonthFromDate(date);
      const mood = journal.mood.type;

      const newStore = {
        journals: { ...store.journals },
        indexes: { ...store.indexes },
      };

      delete newStore.journals[journalId];

      newStore.indexes.byDate[date] = (
        newStore.indexes.byDate[date] || []
      ).filter(id => id !== journalId);
      newStore.indexes.byMonth[month] = (
        newStore.indexes.byMonth[month] || []
      ).filter(id => id !== journalId);
      newStore.indexes.byMood[mood] = (
        newStore.indexes.byMood[mood] || []
      ).filter(id => id !== journalId);
      await this.saveJournalStore(newStore);
      return newStore;
    } catch (err) {
      throw err;
    }
  }

  static getCountForDate(
    indexes: JournalIndexes,
    year: number,
    month: number | string,
    date: number,
  ): number {
    const dateString = getISODateString(year, month, date);
    return (indexes?.byDate[dateString] || []).length;
  }

  static getCountForMonth(
    indexes: JournalIndexes,
    year: number,
    month: number | MonthKey,
  ): number {
    const monthString = getISOMonthString(year, month);
    return (indexes?.byMonth[monthString] || []).length;
  }

  static getMoodForDate(store: JournalStore, date: ISODateString) {
    const thatDays = store.indexes.byDate[date] || [];
    return thatDays.map(day => store.journals[day].mood);
  }

  static getJournals(
    store: JournalStore,
    date: ISODateString | ISOMonthString | null,
  ): Journal[] | ISODateString | null {
    if (!date) return null;
    const splitDate = date.split('-');

    if (splitDate?.[2]) {
      return this.getJournalsByDate(store, date as ISODateString);
    }
    return this.getJournalsByMonth(store, date as ISOMonthString);
  }

  static getJournalById(journals: Journals, journalId: string): Journal | null {
    return journals[journalId] || null;
  }

  static getJournalsByDate(
    store: JournalStore,
    date: ISODateString,
  ): Journal[] | ISODateString | null {
    const dailyJournalsIndex = store.indexes.byDate[date] || [];
    if (dailyJournalsIndex.length === 0) {
      return date;
    }
    return dailyJournalsIndex.map(journalIndex => store.journals[journalIndex]);
  }

  static getJournalsByMonth(store: JournalStore, monthDate: ISOMonthString) {
    const monthlyJournalsIndex = store.indexes.byMonth[monthDate] || [];
    if (monthlyJournalsIndex.length === 0) {
      return null;
    }
    return monthlyJournalsIndex.map(
      journalIndex => store.journals[journalIndex],
    );
  }
}
