import { H1, styled, XStack, YStack } from 'tamagui';
import { FALL_STYLE, FALL_STYLE_KEY } from '@/styles/animations';
import { LinearGradient } from 'tamagui/linear-gradient';

export const WeekDayContainer = styled(YStack, {
  mb: '$4',
  animation: 'bouncy',
  enterStyle: FALL_STYLE,
  animateOnly: FALL_STYLE_KEY,
});

export const OuterGradientBox = styled(LinearGradient, {
  p: '$1.5',
  rounded: '$8',
  colors: ['$gray12', '$gray11'],
  start: [0, -0.6],
  end: [2, 0],
});

export const InnerGradientBox = styled(LinearGradient, {
  p: '$4',
  rounded: '$7',
  colors: ['$gray11', '$gray12'],
  start: [0, -0.6],
  end: [0.3, 0],
});

export const CurrentMonthBox = styled(XStack, {
  justify: 'space-between',
});

export const CurrentMonthText = styled(H1, {
  fontWeight: '800',
  color: '$gray1',
});
