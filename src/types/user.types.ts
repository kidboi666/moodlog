import { Nullable } from '@/types/utill.types';

export type UserInfo = {
  id: string;
  userName: string;
  daysSinceSignup: number;
  age: Nullable<number>;
  email: Nullable<string>;
  provider: Nullable<string>;
  avatarUrl: Nullable<string>;
};

export type NewUserInfo = {} & Partial<
  Pick<UserInfo, 'email' | 'age' | 'avatarUrl' | 'userName'>
>;
