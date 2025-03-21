import { Draft, Journal } from '@/types/journal.types';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import { Nullable } from '@/types/common.types';
import { Mood } from '@/types/mood.types';

export type JournalState = {
  journals: Journal[];
  isSubmitted: boolean;
  yearlyJournals: Journal[];
  monthlyJournals: Journal[];
  dailyJournals: Journal[] | ISODateString;
  selectedJournal: Journal | null;
  isLoading: boolean;
  error: Error | null;
};

export type JournalAction =
  | {
      type: 'SET_SELECTED_JOURNAL';
      payload: Journal | null;
    }
  | { type: 'SET_YEARLY_JOURNAL'; payload: Journal[] }
  | { type: 'SET_MONTHLY_JOURNAL'; payload: Journal[] }
  | { type: 'SET_DAILY_JOURNALS'; payload: Journal[] | ISODateString }
  | { type: 'SET_IS_SUBMITTED'; payload: boolean }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_JOURNALS'; payload: Journal[] }
  | { type: 'SET_ERROR'; payload: Error | null };

export interface JournalStore {
  journals: Journal[];
  dailyJournals: Journal[] | ISODateString;
  selectedJournal: Nullable<Journal>;
  monthlyJournals: Journal[];
  yearlyJournals: Journal[];
  isSubmitted: boolean;
  error: Error | null;
  addJournal: (journal: Draft) => void;
  removeJournal: (id: string) => void;
  getCountForMonth: (year: number, month: number | string) => DateCounts;
  getCountForDate: (
    year: number,
    month: number | string,
    date: number,
  ) => number;
  getMoodForDate: (year: number, month: number, date: number) => Mood[];
  onSelectedJournalChange: (journalId: string) => void;
  updateJournals: (newJournal: Journal) => void;
  onDailyJournalsChange: (date: ISODateString) => void;
  onMonthlyJournalsChange: (date: ISOMonthString) => void;
  onYearlyJournalsChange: (year: number) => void;
}
