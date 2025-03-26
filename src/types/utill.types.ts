/**
 * helpers
 */
export type Nullable<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export type LoadingStatus = {
  isLoading: boolean;
};

export type ErrorStatus = {
  error: Error | null;
};

export type MutuallyRequired<T, K extends keyof T> =
  | { [P in K]?: never }
  | { [P in K]-?: T[P] };
