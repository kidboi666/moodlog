import { styled, YStack } from 'tamagui';
import { PRESS_STYLE } from '@/core/styles/animations';

export const CardContainer = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  p: '$4',
  animation: 'bouncy',
  pressStyle: PRESS_STYLE,

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});
