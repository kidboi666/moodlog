import { Mood } from '@/types/mood.types';
import { Nullable } from '@/types/common.types';

export type Draft = {
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
};