import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Nullable } from '@/types/common.types';
import { STORAGE_KEY } from '@/core/constants/storage';
import { UserStore } from '@/core/store/types';
import { NewUserInfo } from '@/types/user.types';
import { useApp } from '@/core/store/contexts/app.context';
import { userReducer } from '@/core/store/reducers/user.reducer';
import { UserState } from '@/core/store/types/user.types';
import { UserService } from '@/core/store/services/user.service';

const initialState: UserState = {
  id: '',
  userName: '',
  email: null,
  provider: null,
  age: null,
  avatarUrl: null,
  daysSinceSignup: 0,
  error: null,
};

export const UserContext = createContext<Nullable<UserStore>>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { initFirstLaunchStatus, firstLaunchDate } = useApp();

  const signUp = useCallback(
    async (userName: string) => {
      try {
        const newUser = await UserService.saveUser(state, userName);
        dispatch({ type: 'SET_USER_INFO', payload: newUser });
        await initFirstLaunchStatus();
      } catch (err) {
        console.error('failed to save user data : ', err);
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    },
    [initFirstLaunchStatus, state.userName],
  );

  const handleDraftUserNameChange = useCallback((userName: string) => {
    dispatch({ type: 'SET_USER_NAME', payload: userName });
  }, []);

  const updateDaysSinceSignup = useCallback(async () => {
    if (!firstLaunchDate) return;
    try {
      const newDaysSinceSignup = await UserService.saveDaysSinceSignup(
        state,
        firstLaunchDate,
      );
      dispatch({ type: 'SET_DAYS_SINCE_SIGNUP', payload: newDaysSinceSignup });
    } catch (err) {
      console.error('failed to save user data : ', err);
      dispatch({ type: 'SET_ERROR', payload: err });
    }
  }, [firstLaunchDate]);

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
      const savedUserData = await AsyncStorage.getItem(STORAGE_KEY.USER_INFO);
      if (savedUserData) {
        setUserInfo(JSON.parse(savedUserData));
        await initFirstLaunchStatus();
      }
    } catch (err) {
      console.error('failed to load user data', err);
    }
  }, [initFirstLaunchStatus]);

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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
