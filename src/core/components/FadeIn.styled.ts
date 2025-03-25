import { styled, View } from 'tamagui';

export const FadeInContainer = styled(View, {
  animation: 'lazy',
  animateOnly: ['opacity'],
  enterStyle: {
    opacity: 0,
  },

  variants: {
    isVisible: {
      false: {
        opacity: 0,
      },
    },
  } as const,
});
