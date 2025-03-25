import { Button, styled, View } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/core/styles/animations';

export const DevMenuButton = styled(Button, {
  unstyled: true,
  p: '$2',
  scaleIcon: 1.5,
  rounded: '$2',
  animation: 'quick',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
});

export const RestBox = styled(View, {
  flex: 1,
});
