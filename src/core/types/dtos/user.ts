import { UserInfo } from '@/core/types/entries';

export type NewUserInfo = {} & Partial<
  Pick<UserInfo, 'email' | 'age' | 'avatarUrl'>
>;
