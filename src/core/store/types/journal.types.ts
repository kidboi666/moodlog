import { Draft, Journal } from '@/types/journal.types';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import { Mood } from '@/types/mood.types';

type SelectedJournal = Journal | null;
type SelectedJournals = Journal[] | ISODateString | null;

export type JournalState = {
  journals: Journal[];
  selectedJournals: SelectedJournals;
  selectedJournal: SelectedJournal;
};

export type JournalAction =
  | { type: 'SET_SELECTED_JOURNAL'; payload: SelectedJournal }
  | { type: 'SET_SELECTED_JOURNALS'; payload: SelectedJournals }
  | { type: 'SET_JOURNALS'; payload: Journal[] };

export type JournalBaseContextType = {
  journals: Journal[];
};

export type JournalDataContextType = {
  selectedJournals: SelectedJournals;
  selectedJournal: SelectedJournal;
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
