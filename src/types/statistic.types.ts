import { ISOMonthString } from '@/types/date.types';
import { MoodType, SignatureMood } from '@/types/mood.types';

export type SelectedMonthStats = {
  month: ISOMonthString;
  count: number;
  frequency: number;
  activeDay: string;
  signatureMood: SignatureMood;
};

export type ExpressiveMonthStats = {
  month: ISOMonthString;
  count: number;
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

export type CountScore = {
  count: number;
  score: number;
};

export type ScoreBoard = {
  [key in MoodType]: CountScore;
};

export type MoodStats = {
  signatureMood: SignatureMood;
  scoreBoard: ScoreBoard;
};

export enum ExpansionState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

export enum TimeRange {
  YEARLY = 'yearly',
  MONTHLY = 'monthly',
}
