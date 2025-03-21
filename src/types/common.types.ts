/**
 * helpers
 */
export type Nullable<T> = T | null;

export type WithState<T, S> = T & S;

export type ValueOf<T> = T[keyof T];

/**
 * interface
 */
export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: Error | null;
}
