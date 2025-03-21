import { Nullable } from '@/types/common.types';

export type UserState = {
  id: string;
  userName: string;
  email: Nullable<string>;
  provider: Nullable<string>;
  age: Nullable<number>;
  avatarUrl: Nullable<string>;
  daysSinceSignup: number;
  error: Nullable<Error>;
};

export type UserAction =
  | { type: 'SET_USER_INFO'; payload: UserState }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_DAYS_SINCE_SIGNUP'; payload: number }
  | { type: 'SET_ERROR'; payload: Error };
