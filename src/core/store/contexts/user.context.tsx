import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { NewUserInfo } from '@/types/user.types';
import { useApp } from '@/core/store/contexts/app.context';
import { userReducer } from '@/core/store/reducers/user.reducer';
import { UserInfoContextType, UserState } from '@/core/store/types/user.types';
import { UserService } from '@/core/store/services/user.service';
import { StatusState } from '../types/state.types';
import { statusReducer } from '@/core/store/reducers/status.reducer';

const initialState: UserState = {
  userInfo: {
    id: '',
    userName: '',
    email: null,
    provider: null,
    age: null,
    avatarUrl: null,
    daysSinceSignup: 0,
  },
};

export const UserInfoContext =
  createContext<Nullable<UserInfoContextType>>(null);
export const UserStatusContext = createContext<Nullable<StatusState>>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [status, setStatus] = useReducer(statusReducer, {
    isLoading: false,
    error: null,
  });
  const { initFirstLaunchStatus, firstLaunchDate } = useApp();

  const registerUser = useCallback(
    async (userName: string) => {
      try {
        const newUser = await UserService.saveNewUser(state.userInfo, userName);
        dispatch({ type: 'SET_USER_INFO', payload: newUser });
        await initFirstLaunchStatus();
      } catch (err) {
        console.error('failed to save user data : ', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    },
    [initFirstLaunchStatus, state.userInfo.userName],
  );

  const handleDraftUserNameChange = useCallback((userName: string) => {
    dispatch({ type: 'SET_USER_NAME', payload: userName });
  }, []);

  const updateDaysSinceSignup = useCallback(async () => {
    try {
      if (!firstLaunchDate) return;

      const newDaysSinceSignup = await UserService.saveDaysSinceSignup(
        state.userInfo,
        firstLaunchDate,
      );
      dispatch({ type: 'SET_DAYS_SINCE_SIGNUP', payload: newDaysSinceSignup });
    } catch (err) {
      console.error('failed to save user data : ', err);
      setStatus({ type: 'SET_ERROR', payload: err });
    }
  }, [firstLaunchDate]);

  const handleUserInfoChange = useCallback(
    async (updatedUserInfo: NewUserInfo) => {
      try {
        const newUserInfo = await UserService.saveUser(
          state.userInfo,
          updatedUserInfo,
        );
        dispatch({ type: 'SET_USER_INFO', payload: newUserInfo });
      } catch (err) {
        console.error('failed to save user data : ', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    },
    [],
  );

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUserData = await UserService.loadUser();

        if (savedUserData) {
          dispatch({ type: 'SET_USER_INFO', payload: savedUserData });
          await initFirstLaunchStatus();
        }
      } catch (err) {
        console.error('failed to load user data', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    };

    void loadUserData();
  }, []);

  useEffect(() => {
    if (firstLaunchDate) {
      updateDaysSinceSignup();
    }
  }, [firstLaunchDate, updateDaysSinceSignup]);

  return (
    <UserInfoContext.Provider
      value={useMemo(
        () => ({
          userInfo: state.userInfo,
          draftUserName: state.userInfo.userName,
          registerUser,
          onUserInfoChange: handleUserInfoChange,
          onDraftUserNameChange: handleDraftUserNameChange,
        }),
        [
          state.userInfo,
          state.userInfo.userName,
          registerUser,
          handleUserInfoChange,
          handleDraftUserNameChange,
        ],
      )}
    >
      <UserStatusContext.Provider
        value={useMemo(
          () => ({
            isLoading: status.isLoading,
            error: status.error,
          }),
          [status.isLoading, status.error],
        )}
      >
        {children}
      </UserStatusContext.Provider>
    </UserInfoContext.Provider>
  );
};

export const useUser = () => {
  const userInfo = useContext(UserInfoContext);
  const userStatus = useContext(UserStatusContext);
  if (!userInfo || !userStatus) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return userInfo;
};
