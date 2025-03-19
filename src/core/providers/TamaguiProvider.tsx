import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui';
import config from '../../../tamagui.config';

export const TamaguiBaseProvider = ({
  colorScheme,
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & {
  colorScheme?: 'dark' | 'light' | null;
}) => {
  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      {children}
    </TamaguiProvider>
  );
};
