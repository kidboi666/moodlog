import { ISODateString } from '@/types/date.types';
import { Nullable } from '@/types/utill.types';
import { Mood } from '@/types/mood.types';

export type Journal = {
  id: string;
  content: string;
  mood: Mood;
  createdAt: string;
  localDate: ISODateString; // YYYY-MM-DD
  imageUri: Nullable<string>;
};

export type Journals = Record<string, Journal>;

export enum CardPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export type Draft = {
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
};
