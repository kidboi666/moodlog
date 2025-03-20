import { Journal } from '@/types/journal.types';
import { ISODateString } from '@/types/date.types';

type JournalState = {
  journals: Journal[];
  isSubmitted: boolean;
  yearlyJournals: Journal[];
  monthlyJournals: Journal[];
  dailyJournals: Journal[] | ISODateString;
  selectedJournal: Journal | null;
  isLoading: boolean;
};

type JournalAction =
  | {
      type: 'SET_SELECTED_JOURNAL';
      payload: Journal | null;
    }
  | { type: 'SET_YEARLY_JOURNAL'; payload: Journal[] }
  | { type: 'SET_MONTHLY_JOURNAL'; payload: Journal[] }
  | { type: 'SET_DAILY_JOURNALS'; payload: Journal[] | ISODateString }
  | { type: 'SET_IS_SUBMITTED'; payload: boolean }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'INIT_JOURNALS'; payload: Journal[] }
  | { type: 'SET_JOURNAL'; payload: Journal };

export const journalReducer = (state: JournalState, action: JournalAction) => {
  switch (action.type) {
    case 'SET_SELECTED_JOURNAL':
      return { ...state, selectedJournal: action.payload };
    case 'SET_YEARLY_JOURNAL':
      return { ...state, yearlyJournals: action.payload };
    case 'SET_MONTHLY_JOURNAL':
      return { ...state, monthlyJournals: action.payload };
    case 'SET_DAILY_JOURNALS':
      return { ...state, dailyJournals: action.payload };
    case 'SET_IS_SUBMITTED':
      return { ...state, isSubmitted: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'INIT_JOURNALS':
      return { ...state, journals: action.payload };
    case 'SET_JOURNAL':
      return { ...state, journals: [...state.journals, action.payload] };
    default:
      return state;
  }
};
