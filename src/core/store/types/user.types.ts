import { NewUserInfo, UserInfo } from '@/types/user.types';

export type UserState = {
  userInfo: UserInfo;
};

export type UserAction =
  | { type: 'SET_USER_INFO'; payload: UserInfo }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_DAYS_SINCE_SIGNUP'; payload: number }
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_IS_LOADING'; payload: boolean };

export type UserInfoContextType = {
  userInfo: UserInfo;
  draftUserName: string;
  registerUser: (userName: string) => void;
  onUserInfoChange: (newUserInfo: NewUserInfo) => void;
  onDraftUserNameChange: (userName: string) => void;
};
