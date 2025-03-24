import { Mood } from '@/types/mood.types';
import { Nullable } from '@/types/common.types';

export type DraftState = {
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
};

export type DraftAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_IMAGE_URI'; payload: string }
  | { type: 'INIT_DRAFT' };

export type DraftContentContextType = {
  content: string;
};

export type DraftMetadataContextType = {
  mood?: Mood;
  imageUri: Nullable<string>;
};

export type DraftActionContextType = {
  initDraft: () => void;
  onMoodChange: (mood: Mood) => void;
  onImageUriChange: () => Promise<Nullable<void>>;
  onContentChange: (content: string) => void;
};
