import { ThemeAction, ThemeState } from '@/core/store/types/theme.types';

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { ...state, currentTheme: action.payload };
    default:
      return state;
  }
};
