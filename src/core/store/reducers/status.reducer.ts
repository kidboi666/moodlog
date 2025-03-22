import { StatusAction, StatusState } from '@/core/store/types/state.types';

export const statusReducer = (state: StatusState, action: StatusAction) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
