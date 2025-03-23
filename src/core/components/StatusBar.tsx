import { StatusBar as RNStatusBar } from 'react-native';
import { memo } from 'react';
import { Theme } from '@/types/app.types';

interface Props {
  resolvedTheme?: Omit<Theme, 'system'>;
}

export const StatusBar = memo(({ resolvedTheme }: Props) => {
  return (
    <RNStatusBar
      backgroundColor="transparent"
      translucent
      barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
});
