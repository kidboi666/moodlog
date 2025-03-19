import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserStore } from '@/core/types/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { UserInfo } from '@/core/types/entries';
import { Nullable } from '@/core/types/utils';
import { STORAGE_KEY } from '@/core/constants/storage';
import { useApp } from '@/core/store/hooks/useApp';
import { NewUserInfo } from '@/core/types/dtos/user';

const INITIAL_USER_INFO = {
  id: '',
  userName: '',
  daysSinceSignup: 0,
  email: null,
  provider: null,
  age: null,
  avatarUrl: null,
};

export const UserContext = createContext<Nullable<UserStore>>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(INITIAL_USER_INFO);
  const [draftUserName, setDraftUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { initializeFirstLaunchStatus, firstLaunchDate } = useApp();

  const signUp = useCallback(
    async (userName: string) => {
      try {
        setIsLoading(true);
        const newUser = {
          ...userInfo,
          id: uuid.v4(),
          userName: userName,
        };
        await AsyncStorage.setItem(
          STORAGE_KEY.USER_INFO,
          JSON.stringify(newUser),
        );
        setUserInfo(newUser);
        await initializeFirstLaunchStatus();
      } catch (err) {
        console.error('Failed to save user data', err);
      } finally {
        setIsLoading(false);
      }
    },
    [initializeFirstLaunchStatus, userInfo],
  );

  const handleDraftUserNameChange = useCallback((userName: string) => {
    setDraftUserName(userName);
  }, []);

  const calculateDaysSinceSignup = useCallback((launchDate: string) => {
    const today = new Date();
    const signupDate = new Date(launchDate);
    const diffTime = today.getTime() - signupDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const updateDaysSinceSignup = useCallback(() => {
    if (!firstLaunchDate) return;

    const daysSinceSignup = calculateDaysSinceSignup(firstLaunchDate);
    setUserInfo(prev => {
      if (prev.daysSinceSignup === daysSinceSignup) return prev;

      return { ...prev, daysSinceSignup };
    });
  }, [firstLaunchDate, calculateDaysSinceSignup]);

  const handleUserInfoChange = useCallback((newUserInfo: NewUserInfo) => {
    setUserInfo(prev => {
      const updated = { ...prev, ...newUserInfo };
      AsyncStorage.setItem(
        STORAGE_KEY.USER_INFO,
        JSON.stringify(updated),
      ).catch(err => console.error('유저 정보 업데이트 실패', err));
      return updated;
    });
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedUserData = await AsyncStorage.getItem(STORAGE_KEY.USER_INFO);
      if (savedUserData) {
        setUserInfo(JSON.parse(savedUserData));
        await initializeFirstLaunchStatus();
      }
    } catch (err) {
      console.error('Failed to load user data', err);
    } finally {
      setIsLoading(false);
    }
  }, [initializeFirstLaunchStatus]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    if (firstLaunchDate) {
      updateDaysSinceSignup();
    }
  }, [firstLaunchDate, updateDaysSinceSignup]);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({
          signUp,
          userInfo,
          isLoading,
          draftUserName,
          onUserInfoChange: handleUserInfoChange,
          onDraftUserNameChange: handleDraftUserNameChange,
        }),
        [
          signUp,
          userInfo,
          isLoading,
          draftUserName,
          handleUserInfoChange,
          handleDraftUserNameChange,
        ],
      )}
    >
      {children}
    </UserContext.Provider>
  );
};
