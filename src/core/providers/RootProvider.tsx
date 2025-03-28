import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
import { useColorScheme } from 'react-native';
import { ContextProvider } from '@/core/providers/ContextProvider';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ContextProvider>
        <PortalProvider>
          <ToastProvider>{children}</ToastProvider>
        </PortalProvider>
      </ContextProvider>
    </TamaguiBaseProvider>
  );
};
