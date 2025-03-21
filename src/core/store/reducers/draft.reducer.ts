import { Draft } from '@/types/journal.types';
import { DraftAction, DraftState } from '@/core/store/types/draft.types';

export const draftReducer = (state: DraftState, action: DraftAction): Draft => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_MOOD':
      return { ...state, mood: action.payload };
    case 'SET_IMAGE_URI':
      return { ...state, imageUri: action.payload };
    case 'INIT_DRAFT':
      return action.payload;
    default:
      return state;
  }
};
