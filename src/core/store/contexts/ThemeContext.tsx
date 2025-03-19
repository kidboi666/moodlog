import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ThemeStore } from '@/core/types/store';
import { Theme as TamaguiTheme } from 'tamagui';
import { useColorScheme } from 'react-native';
import { Nullable } from '@/core/types/utils';
import { Theme } from '@/core/types/enums';

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
