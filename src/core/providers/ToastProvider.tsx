import { CurrentToast } from '@/core/components/shared/CurrentToast';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { PropsWithChildren } from 'react';

export const TamaguiToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <ToastProvider
      swipeDirection="horizontal"
      duration={6000}
      native={
        [
          // uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go
          // 'mobile'
        ]
      }
    >
      {children}
      <CurrentToast />
      <ToastViewport top="$8" left={0} right={0} />
    </ToastProvider>
  );
};
