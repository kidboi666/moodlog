import { Mood } from '@/types/mood.types';
import { Draft } from '@/types/journal.types';
import { Nullable } from '@/types/common.types';
import { ISODateString } from '@/types/date.types';

type DraftState = {
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
  localDate: ISODateString;
};

type DraftAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_IMAGE_URI'; payload: string }
  | { type: 'INIT_DRAFT'; payload: Draft };

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
