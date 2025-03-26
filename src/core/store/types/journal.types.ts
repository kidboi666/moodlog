import { Draft, Journal, Journals } from '@/types/journal.types';
import { ISODateString, ISOMonthString, MonthKey } from '@/types/date.types';
import { Mood, MoodType } from '@/types/mood.types';

/**
 * Types
 */
export type YearIndexes = Record<number, string[]>;
export type MonthIndexes = Record<ISOMonthString, string[]>;
export type DateIndexes = Record<ISODateString, string[]>;
export type MoodIndexes = Record<MoodType, string[]>;
export type SelectedJournals = Journal[] | ISODateString | null;
export type SelectedJournal = Journal | null;

export type JournalIndexes = {
  byYear: YearIndexes;
  byMonth: MonthIndexes;
  byDate: DateIndexes;
  byMood: MoodIndexes;
};

export type JournalStore = {
  journals: Journals;
  indexes: JournalIndexes;
};

/**
 * Reducer
 */
export type JournalState = {
  store: JournalStore;
  selectedJournals: SelectedJournals;
  selectedJournal: SelectedJournal;
};

export type JournalAction =
  | { type: 'SET_STORE'; payload: JournalStore }
  | { type: 'SET_SELECTED_JOURNALS'; payload: Journal[] | ISODateString | null }
  | { type: 'SET_SELECTED_JOURNAL'; payload: Journal | null };

/**
 * Context
 */
export type JournalDataContextType = {
  journals: Journals;
  indexes: JournalIndexes;
  selectedJournal: SelectedJournal;
  selectedJournals: SelectedJournals;
};

export type JournalActionContextType = {
  addJournal: (journal: Draft) => Promise<void>;
  removeJournal: (id: string) => Promise<void>;
  selectJournal: (journalId: string) => void;
  selectJournals: (date: ISODateString | ISOMonthString | null) => void;
  getCountForMonth: (year: number, month: number | MonthKey) => number;
  getCountForDate: (
    year: number,
    month: number | string,
    date: number,
  ) => number;
  getMoodForDate: (date: ISODateString) => Mood[];
};
