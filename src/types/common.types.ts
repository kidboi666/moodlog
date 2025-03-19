/**
 * helpers
 */
export type Nullable<T> = T | null;

export type WithState<T, S> = T & S;

export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: Error | null;
}
