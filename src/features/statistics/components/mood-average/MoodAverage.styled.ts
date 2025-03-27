import { styled, YStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';

export const CardContainer = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  overflow: 'hidden',
  animation: 'medium',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});

export const AnimatedContent = styled(YStack, {
  flex: 1,
  p: '$4',
  animation: 'bouncy',
  animateOnly: ['height'],
  height: RECORD_CARD_HEIGHT,

  variants: {
    expanded: {
      true: {
        height: RECORD_CARD_EXPANDED_HEIGHT,
      },
    },
  } as const,
});
