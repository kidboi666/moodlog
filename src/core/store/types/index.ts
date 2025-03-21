import { LoadingState, WithState } from '@/types/common.types';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import { Journal } from '@/types/journal.types';
import { NewUserInfo, UserInfo } from '@/types/user.types';

export interface UserStore {
  userInfo: UserInfo;
  draftUserName: string;
  signUp: (userName: string) => void;
  onUserInfoChange: (newUserInfo: NewUserInfo) => void;
  onDraftUserNameChange: (userName: string) => void;
}

export interface ScrollStore {
  scrollPosition: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  resetScroll: () => void;
}

export type StorageStore = WithState<
  {
    journals: Journal[];
    setJournals: Dispatch<SetStateAction<Journal[]>>;
  },
  LoadingState
>;
