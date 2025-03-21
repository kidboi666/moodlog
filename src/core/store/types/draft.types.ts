import { Mood } from '@/types/mood.types';
import { Nullable } from '@/types/common.types';
import { ISODateString } from '@/types/date.types';
import { Draft } from '@/types/journal.types';
import {
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { MutableRefObject } from 'react';
import { EnhancedTextInputRef } from '@/features/write/components/EnhancedTextInput';

export type DraftState = {
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
  localDate: ISODateString;
};

export type DraftAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_IMAGE_URI'; payload: string }
  | { type: 'INIT_DRAFT'; payload: Draft };

export interface DraftStore {
  draft: Draft;
  initDraft: () => void;
  selection: { start: number; end: number };
  onSelectionChange: (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => void;
  enhancedInputRef: MutableRefObject<EnhancedTextInputRef | null>;
  onTimeStamp: () => void;
  onMoodChange: (mood: Mood) => void;
  onImageUriChange: () => Promise<Nullable<void>>;
  onContentChange: (content: string) => void;
}
