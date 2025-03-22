import { Theme } from '@/types/app.types';

export type ThemeState = {
  currentTheme: Theme;
};

export type ThemeAction = {
  type: 'CHANGE_THEME';
  payload: Theme;
};

export type ThemeStore = {
  changeTheme: (theme: Theme) => void;
  currentTheme: Theme;
  resolvedTheme: Omit<Theme, 'system'>;
};
