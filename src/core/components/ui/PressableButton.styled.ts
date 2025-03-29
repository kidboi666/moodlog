import { Button, styled } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';

export const PressableButton = styled(Button, {
  scaleIcon: 1.5,
  bg: '$backgroundHover',
  animation: 'quick',
  pressStyle: PRESS_STYLE,
  animateOnly: PRESS_STYLE_KEY,

  variants: {
    disabled: {
      true: {
        bg: '$backgroundPress',
        opacity: 0.5,
      },
    },
  } as const,
});
