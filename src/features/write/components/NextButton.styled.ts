import { Button, styled, View } from 'tamagui';
import {
  ENTER_STYLE,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/core/constants/styles';

export const ViewContainer = styled(View, {
  items: 'center',
});

export const NextButton = styled(Button, {
  unstyled: true,
  p: '$4',
  bg: '$gray12',
  color: '$gray1',
  rounded: '$4',
  animation: 'quick',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
  enterStyle: ENTER_STYLE,
  scaleIcon: 1.5,
});
