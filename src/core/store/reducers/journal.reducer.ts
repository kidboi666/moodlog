import { JournalAction, JournalState } from '@/core/store/types/journal.types';

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
    case 'SET_JOURNALS':
      return { ...state, journals: action.payload };
    case 'SET_ERROR': {
      console.error('data load failed : ', action.payload);
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
