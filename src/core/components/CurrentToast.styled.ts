import { styled, YStack } from 'tamagui';
import { Toast } from '@tamagui/toast';

export const ToastContainer = styled(Toast, {
  animation: 'quick',
  enterStyle: { opacity: 0, scale: 0.5, y: -25 },
  exitStyle: { opacity: 0, scale: 1, y: -20 },
  y: '$3',
  rounded: '$6',
});

export const ToastContent = styled(YStack, {
  items: 'center',
  p: '$2',
  gap: '$2',
});

export const ToastTitle = styled(Toast.Title, {
  fontWeight: '800',
});
