import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { UserStore } from 'src/types/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { UserInfo } from '@/types/entries';
import { Nullable } from 'src/types/utils';
import { STORAGE_KEY } from '@/constants/storage';
import { useApp } from '@/store/hooks/useApp';
import { NewUserInfo } from '@/types/dtos/user';

export const UserContext = createContext<Nullable<UserStore>>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    userName: '',
    daysSinceSignup: 0,
    email: null,
    provider: null,
    age: null,
    avatarUrl: null,
  });
  const [draftUserName, setDraftUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { initializeFirstLaunchStatus, firstLaunchDate } = useApp();

  const signUp = async (userName: string) => {
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
  };

  const handleDraftUserNameChange = (userName: string) => {
    setDraftUserName(userName);
  };

  const handleDaysSinceSignupChange = () => {
    const daysSinceSignup = new Date(
      new Date().getTime() - new Date(firstLaunchDate as string).getTime(),
    ).getDate();
    setUserInfo(prev => ({ ...prev, daysSinceSignup }));
  };

  const handleUserInfoChange = (newUserInfo: NewUserInfo) => {
    setUserInfo(prev => ({ ...prev, ...newUserInfo }));
  };

  useEffect(() => {
    const loadUserData = async () => {
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
    };

    void loadUserData();
  }, []);

  useEffect(() => {
    handleDaysSinceSignupChange();
  }, [firstLaunchDate]);

  return (
    <UserContext.Provider
      value={{
        signUp,
        userInfo,
        isLoading,
        draftUserName,
        onUserInfoChange: handleUserInfoChange,
        onDraftUserNameChange: handleDraftUserNameChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
