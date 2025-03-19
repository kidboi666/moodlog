import { ISODateString } from '@/core/types/date.types';
import { Nullable } from '@/core/types/common.types';
import { Mood } from '@/core/types/mood.types';

export type Journal = {
  id: string;
  content: string;
  mood: Mood;
  createdAt: string;
  localDate: ISODateString; // YYYY-MM-DD
  imageUri: Nullable<string>;
};

export type Draft = {
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
};
