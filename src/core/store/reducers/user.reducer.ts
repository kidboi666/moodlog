import { UserAction, UserState } from '@/core/store/types/user.types';

export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload };
    case 'SET_USER_NAME':
      return {
        ...state,
        userInfo: { ...state.userInfo, userName: action.payload },
      };
    case 'SET_DAYS_SINCE_SIGNUP':
      return {
        ...state,
        userInfo: { ...state.userInfo, daysSinceSignup: action.payload },
      };
    default:
      return state;
  }
};
