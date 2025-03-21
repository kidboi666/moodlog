import { StatusBar as RNStatusBar } from 'react-native';

import { useAppTheme } from '@/core/store/contexts/theme.context';

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
