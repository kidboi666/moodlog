import { MONTHS, WEEK_DAY } from '@/core/constants/date';

/**
 * type
 */
export type Nullable<T> = T | null;

export type WithState<T, S> = T & S;

export type WeekDayKey = keyof typeof WEEK_DAY;
export type WeekDayValue = (typeof WEEK_DAY)[WeekDayKey];

export type MonthKey = keyof typeof MONTHS;
export type MonthValue = (typeof MONTHS)[MonthKey];
/**
 * interface
 */
export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: Error | null;
}
