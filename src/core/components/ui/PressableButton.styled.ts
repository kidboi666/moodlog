import { Button, styled } from 'tamagui';
import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/styles/animations';

export const PressableButton = styled(Button, {
  scaleIcon: 1.5,
  elevate: true,
  bg: '$backgroundHover',
  animation: 'quick',
  enterStyle: MOUNT_STYLE,
  pressStyle: PRESS_STYLE,
  animateOnly: [...PRESS_STYLE_KEY, ...MOUNT_STYLE_KEY],
});
