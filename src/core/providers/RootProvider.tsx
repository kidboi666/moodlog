import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { TamaguiToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
import { useColorScheme } from 'react-native';
import { ContextProvider } from '@/core/providers/ContextProvider';
import { ThemeContextProvider } from '@/core/store/contexts/theme.context';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <ContextProvider>
      <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
        <ThemeContextProvider>
          <TamaguiToastProvider>
            <PortalProvider>{children}</PortalProvider>
          </TamaguiToastProvider>
        </ThemeContextProvider>
      </TamaguiBaseProvider>
    </ContextProvider>
  );
};
