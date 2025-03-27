import { Button, H3, H5, styled, YStack } from 'tamagui';
import {
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/core/styles/animations';

export const TodayContainer = styled(YStack, {
  justify: 'center',
  items: 'center',
  gap: '$3',
  p: '$6',
  px: '$9',
  rounded: '$8',
  bg: '$gray4',
});

export const TodayTitle = styled(H3, {
  text: 'center',
  color: '$gray12',
});

export const WriteButton = styled(Button, {
  unstyled: true,
  p: '$4',
  scaleIcon: 1.5,
  rounded: '$4',
  bg: '$gray12',
  color: '$gray1',
  animation: 'quick',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
});

export const PastDaysContainer = styled(Button, {
  unstyled: true,
  p: '$6',
  justify: 'center',
  items: 'center',
  gap: '$3',
  animation: 'quick',
  enterStyle: ENTER_STYLE,
  animateOnly: ENTER_STYLE_KEY,
});

export const PastDaysTitle = styled(H3, {
  color: '$gray10',
});

export const PastDaysDescription = styled(H5, {
  color: '$gray10',
  fontSize: '$4',
});
