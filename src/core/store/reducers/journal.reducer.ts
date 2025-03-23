import { JournalAction, JournalState } from '@/core/store/types/journal.types';

export const journalReducer = (
  state: JournalState,
  action: JournalAction,
): JournalState => {
  switch (action.type) {
    case 'SET_STORE':
      return action.payload;
    case 'SET_MONTH_INDEXES':
      return {
        ...state,
        indexes: {
          ...state.indexes,
          byMonth: action.payload,
        },
      };
    case 'SET_DATE_INDEXES':
      return {
        ...state,
        indexes: {
          ...state.indexes,
          byDate: action.payload,
        },
      };
    default:
      return state;
  }
};
