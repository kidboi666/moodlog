import { JournalAction, JournalState } from '@/core/store/types/journal.types';

export const journalReducer = (state: JournalState, action: JournalAction) => {
  switch (action.type) {
    case 'SET_SELECTED_JOURNAL':
      return { ...state, selectedJournal: action.payload };
    case 'SET_SELECTED_JOURNALS':
      return { ...state, selectedJournals: action.payload };
    case 'SET_JOURNALS':
      return { ...state, journals: action.payload };
    default:
      return state;
  }
};
