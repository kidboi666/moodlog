import { JournalAction, JournalState } from '@/core/store/types/journal.types';

export const journalReducer = (
  state: JournalState,
  action: JournalAction,
): JournalState => {
  switch (action.type) {
    case 'SET_STORE':
      return { ...state, store: action.payload };
    case 'SET_SELECTED_JOURNALS':
      return {
        ...state,
        selectedJournals: action.payload,
      };
    case 'SET_SELECTED_JOURNAL':
      return {
        ...state,
        selectedJournal: action.payload,
      };
    default:
      return state;
  }
};
