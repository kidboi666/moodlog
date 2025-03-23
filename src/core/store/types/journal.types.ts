import { Journal, Journals } from '@/types/journal.types';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import { Mood } from '@/types/mood.types';
import { Draft } from '@/types/draft.types';

export type ByMonth = Record<ISOMonthString, string[]>;
export type ByDate = Record<ISODateString, string[]>;
export type Indexes = {
  byMonth: ByMonth;
  byDate: ByDate;
};

export type JournalState = {
  journals: Journals;
  indexes: Indexes;
};

export type JournalAction =
  | { type: 'SET_STORE'; payload: JournalState }
  | { type: 'SET_MONTH_INDEXES'; payload: ByMonth }
  | { type: 'SET_DATE_INDEXES'; payload: ByDate };

export type JournalBaseContextType = {
  journals: Journals;
};

export type JournalDataContextType = {
  onSelectedJournalChange: (journalId: string) => void;
  onSelectedJournalsChange: (
    date: ISODateString | ISOMonthString | null,
  ) => void;
};

export type JournalActionContextType = {
  addJournal: (journal: Draft) => Promise<void>;
  removeJournal: (id: string) => Promise<void>;
  updateJournals: (newJournal: Journal) => Promise<void>;
  getCountForMonth: (year: number, month: number | string) => DateCounts;
  getCountForDate: (
    year: number,
    month: number | string,
    date: number,
  ) => number;
  getMoodForDate: (date: ISODateString) => Mood[];
};
