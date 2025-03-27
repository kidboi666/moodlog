import { Button, styled, View } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';

export const BackButton = styled(Button, {
  unstyled: true,
  p: '$3',
  scaleIcon: 1.5,
  animation: 'medium',
  rounded: '$4',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
});

export const RestBox = styled(View, {
  flex: 1,
});
