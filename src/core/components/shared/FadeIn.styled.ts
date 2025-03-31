import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations';
import { styled, View } from 'tamagui';

export const FadeInContainer = styled(View, {
  animation: 'lazy',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,

  variants: {
    isVisible: {
      false: {
        opacity: 0,
      },
    },
  } as const,
});
