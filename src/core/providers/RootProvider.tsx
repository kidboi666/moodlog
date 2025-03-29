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
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ThemeContextProvider>
        <TamaguiToastProvider>
          <PortalProvider>
            <ContextProvider>{children}</ContextProvider>
          </PortalProvider>
        </TamaguiToastProvider>
      </ThemeContextProvider>
    </TamaguiBaseProvider>
  );
};
