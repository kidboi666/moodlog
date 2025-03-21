import { UserAction, UserState } from '@/core/store/types/user.types';

export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return action.payload;
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_DAYS_SINCE_SIGNUP':
      return { ...state, daysSinceSignup: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
