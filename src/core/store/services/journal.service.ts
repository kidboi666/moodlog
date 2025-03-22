import { STORAGE_KEY } from '@/core/constants/storage';
import { Draft, Journal } from '@/types/journal.types';
import { StorageService } from '@/core/store/services/storage.service';
import { uuid } from 'expo-modules-core';
import { CalendarUtils } from 'react-native-calendars';
import { getISODateString, getLastDate } from '@/core/utils/common';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';

export class JournalService extends StorageService {
  static async loadJournals(): Promise<Journal[]> {
    try {
      const newJournals = await this.load(STORAGE_KEY.JOURNALS);

      return newJournals ? newJournals : [];
    } catch (err) {
      throw err;
    }
  }

  static async saveJournals(journals: Journal[]): Promise<void> {
    try {
      await this.save(STORAGE_KEY.JOURNALS, journals);
    } catch (err) {
      throw err;
    }
  }

  static async addJournal(
    journals: Journal[],
    draft: Draft,
  ): Promise<Journal[]> {
    if (!draft.content || !draft.mood) {
      throw new Error('not content or mood');
    }
    try {
      const newJournal = {
        id: uuid.v4(),
        content: draft.content,
        mood: draft.mood,
        createdAt: new Date().toISOString(),
        localDate: CalendarUtils.getCalendarDateString(new Date()),
        imageUri: draft.imageUri ? draft.imageUri : null,
      };
      const newJournals = [...journals, newJournal];
      await this.saveJournals(newJournals);

      return newJournals;
    } catch (err) {
      throw err;
    }
  }

  static async updateJournal(
    journals: Journal[],
    updatedJournal: Journal,
  ): Promise<Journal[]> {
    try {
      const journalIndex = journals.findIndex(
        journal => journal.id === updatedJournal.id,
      );

      const updatedJournals = [...journals];
      updatedJournals[journalIndex] = updatedJournal;
      await this.saveJournals(updatedJournals);

      return updatedJournals;
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
    journals: Journal[],
    date: ISODateString | ISOMonthString | null,
  ) {
    if (!date) return null;
    const splitDate = date.split('-');

    if (splitDate?.[2]) {
      return this.getJournalsByDate(journals, date as ISODateString);
    }
    return this.getJournalsByMonth(journals, date as ISOMonthString);
  }

  static getJournalById(journals: Journal[], journalId: string) {
    return journals.find(journal => journal.id === journalId) ?? null;
  }

  static getJournalsByDate(journals: Journal[], date: ISODateString) {
    const dailyJournals = journals.filter(
      journal => journal.localDate === date,
    );
    if (dailyJournals.length === 0) {
      return date;
    }
    return dailyJournals;
  }

  static getJournalsByMonth(journals: Journal[], monthDate: ISOMonthString) {
    const monthlyJournals = journals.filter(journal =>
      journal.localDate.startsWith(monthDate),
    );
    if (monthlyJournals.length === 0) {
      return null;
    }
    return monthlyJournals;
  }

  static getJournalsByYear(journals: Journal[], year: number) {
    return journals.filter(journal =>
      journal.localDate.startsWith(year.toString()),
    );
  }
}
