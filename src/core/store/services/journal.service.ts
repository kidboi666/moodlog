import { STORAGE_KEY } from '@/core/constants/storage';
import { Draft, Journal } from '@/types/journal.types';
import { StorageService } from '@/core/store/services/storage.service';
import { uuid } from 'expo-modules-core';
import { CalendarUtils } from 'react-native-calendars';
import { MONTHS } from '@/core/constants/date';
import { getISODateString } from '@/core/utils/common';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';

export class JournalService extends StorageService {
  static async loadJournals(): Promise<Journal[]> {
    try {
      const newJournals = await this.load(STORAGE_KEY.JOURNALS);

      return newJournals ? JSON.parse(newJournals) : [];
    } catch (err) {
      throw err;
    }
  }

  static async saveJournals(journals: Journal[]): Promise<void> {
    try {
      await this.save(STORAGE_KEY.JOURNALS, JSON.stringify(journals));
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
    let intMonth: number;
    if (typeof month === 'string') {
      intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
    } else {
      intMonth = month;
    }

    const dateString = `${year}-${(intMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    const foundJournals = journals.filter(
      journal => journal.localDate === dateString,
    );

    return foundJournals.length;
  }

  static getMoodForDate(
    journals: Journal[],
    year: number,
    month: number,
    date: number,
  ) {
    const dateString = getISODateString(year, month, date);
    const foundJournals = journals.filter(
      journal => journal.localDate === dateString,
    );

    return foundJournals.map(journal => journal.mood);
  }

  static getCountForMonth(
    journals: Journal[],
    year: number,
    month: number | string,
  ) {
    let intMonth: number;

    if (typeof month === 'string') {
      intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
    } else {
      intMonth = month;
    }
    const lastDay = new Date(year, intMonth, 0).getDate();
    const counts: DateCounts = {};

    for (let day = 1; day <= lastDay; day++) {
      const dateKey = `${year}-${intMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      counts[dateKey] = 0;
    }

    journals.forEach(journal => {
      if (counts.hasOwnProperty(journal.localDate)) {
        counts[journal.localDate]++;
      }
    });

    return counts;
  }

  static getJournalById(journals: Journal[], journalId: string) {
    return journals.find(journal => journal.id === journalId) ?? null;
  }

  static getJournalsByDate(journals: Journal[], date: ISODateString) {
    return journals.filter(journal => journal.localDate === date);
  }

  static getJournalsByMonth(journals: Journal[], monthDate: ISOMonthString) {
    return journals.filter(journal => journal.localDate.startsWith(monthDate));
  }
}
