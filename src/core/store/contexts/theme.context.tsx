import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Theme as TamaguiTheme } from 'tamagui';
import { useColorScheme } from 'react-native';
import { Nullable } from '@/types/utill.types';
import { Theme } from '@/types/app.types';
import { themeReducer } from '@/core/store/reducers/theme.reducer';
import { ThemeState, ThemeStore } from '../types/theme.types';

const initialState: ThemeState = {
  currentTheme: 'system',
};

export const ThemeContext = createContext<Nullable<ThemeStore>>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const colorScheme = useColorScheme();

  const resolvedTheme = useMemo(
    () =>
      state.currentTheme !== 'system'
        ? state.currentTheme
        : colorScheme === 'dark'
          ? 'dark'
          : 'light',
    [colorScheme, state.currentTheme],
  );

  const changeTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'CHANGE_THEME', payload: theme });
  }, []);

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          resolvedTheme,
          currentTheme: state.currentTheme,
          changeTheme,
        }),
        [resolvedTheme, state.currentTheme, changeTheme],
      )}
    >
      <TamaguiTheme name={resolvedTheme}>{children}</TamaguiTheme>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeContextProvider');
  }
  return context;
};
