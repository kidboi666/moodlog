import { EmotionLevel, EmotionType } from '@/core/types/enums';
import { ISODateString, ISOMonthString } from '@/core/types/dtos/date';
import { Nullable } from '@/core/types/utils';

export type Emotion = {
  type: EmotionType;
  level: EmotionLevel;
};

export type Journal = {
  id: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
  localDate: ISODateString; // YYYY-MM-DD
  imageUri: Nullable<string>;
};

export type Draft = {} & Partial<
  Pick<Journal, 'content' | 'emotion' | 'imageUri'>
>;

export type DateCounts = {
  [date: string]: number;
};

export type UserInfo = {
  id: string;
  userName: string;
  daysSinceSignup: number;
  age: Nullable<number>;
  email: Nullable<string>;
  provider: Nullable<string>;
  avatarUrl: Nullable<string>;
};

export type MonthlyCounts = {
  [key in ISOMonthString]: number;
};

export type JournalStats = {
  totalCount: number;
  totalFrequency: number;
  totalActiveDay: string;
  monthlyCounts: MonthlyCounts;
};

export type SelectedMonthStats = {
  month: ISOMonthString;
  count: number;
  frequency: number;
  activeDay: string;
  signatureEmotion: SignatureEmotion;
};

export type ExpressiveMonthStats = {
  month: ISOMonthString;
  count: number;
};

export type CountScore = {
  count: number;
  score: number;
};

export type ScoreBoard = {
  [key in EmotionType]: CountScore;
};

export type SignatureEmotion = {
  type: EmotionType | string;
  count: number;
  score: number;
};

export type EmotionStats = {
  signatureEmotion: SignatureEmotion;
  scoreBoard: ScoreBoard;
};
