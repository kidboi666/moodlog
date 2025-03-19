import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Theme as TamaguiTheme } from 'tamagui';
import { useColorScheme } from 'react-native';
import { Nullable } from '@/types/common.types';
import { ThemeStore } from '@/core/store/types';
import { Theme } from '@/types/app.types';

export const ThemeContext = createContext<Nullable<ThemeStore>>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');
  const colorScheme = useColorScheme();
  const resolvedTheme = useMemo(
    () =>
      currentTheme !== 'system'
        ? currentTheme
        : colorScheme === 'dark'
          ? 'dark'
          : 'light',
    [colorScheme, currentTheme],
  );

  const changeTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({ resolvedTheme, currentTheme, changeTheme }),
        [resolvedTheme, currentTheme, changeTheme],
      )}
    >
      <TamaguiTheme name={resolvedTheme}>{children}</TamaguiTheme>
    </ThemeContext.Provider>
  );
};
