import { StatusBar as RNStatusBar } from 'react-native';
import { useAppTheme } from '@/core/store/hooks/useAppTheme';

export const StatusBar = () => {
  const { resolvedTheme } = useAppTheme();

  return (
    <RNStatusBar
      backgroundColor="transparent"
      translucent
      barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};
