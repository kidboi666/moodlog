/**
 * helpers
 */
export type Nullable<T> = T | null;

export type WithState<T, S> = T & S;

/**
 * interface
 */
export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: Error | null;
}
