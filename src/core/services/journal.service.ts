import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { Draft, Journal } from '@/types/journal.types';
import { uuid } from 'expo-modules-core';
import { CalendarUtils } from 'react-native-calendars';

export class JournalService {
  static async loadJournals(): Promise<Journal[]> {
    try {
      const journals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);

      return journals ? JSON.parse(journals) : [];
    } catch (err) {
      console.error('load journals failed : ', err);
      return [];
    }
  }

  static async saveJournals(journals: Journal[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY.JOURNALS,
        JSON.stringify(journals),
      );
    } catch (err) {
      console.error('save journals failed : ', err);
      throw err;
    }
  }

  static async addJournal(
    journals: Journal[],
    draft: Draft,
  ): Promise<Journal[]> {
    try {
      if (!draft.content || !draft.mood) {
        throw new Error('Draft could not add content');
      }
      const newJournal = {
        id: uuid.v4(),
        content: draft.content,
        mood: draft.mood,
        createdAt: new Date().toISOString(),
        localDate: CalendarUtils.getCalendarDateString(new Date()),
        imageUri: draft.imageUri ? draft.imageUri : null,
      };
      const nextJournals = [...journals, newJournal];
      await this.saveJournals(nextJournals);
      return nextJournals;
    } catch (err) {
      console.error('save journals failed : ', err);
      throw err;
    }
  }

  static async updateJournal(
    journals: Journal[],
    updatedJournal: Journal,
  ): Promise<Journal[]> {
    try {
      const newJournals = [...journals, updatedJournal];
      await this.saveJournals(newJournals);
      return newJournals;
    } catch (err) {
      console.error('');
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
      console.error('remove journals failed : ', err);
      throw err;
    }
  }
}
