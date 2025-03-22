/**
 * helpers
 */
export type Nullable<T> = T | null;

export type WithState<T, S> = T & S;

export type ValueOf<T> = T[keyof T];

export type LoadingStatus = {
  isLoading: boolean;
};

export type ErrorStatus = {
  error: Error | null;
};
