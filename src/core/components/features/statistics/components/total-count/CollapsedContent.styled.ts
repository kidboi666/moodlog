import { Button, styled, Text, View, XStack, YStack } from 'tamagui';
import { RECORD_UNIT_LINE_HEIGHT } from '@/core/constants/size';

export const ViewContainer = styled(View, {
  flex: 1,
  animation: 'quick',
  animateOnly: ['opacity'],
  justify: 'space-between',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

export const YStackContainer = styled(YStack, {
  gap: '$2',
});

export const StackContainer = styled(XStack, {
  items: 'flex-end',
  gap: '$2',
  flex: 1,
});

export const CountText = styled(Text, {
  lineHeight: RECORD_UNIT_LINE_HEIGHT,
  color: '$gray11',
});

export const MinimizeButton = styled(Button, {
  unstyled: true,
  self: 'flex-end',
  bg: 'transparent',
  opacity: 0.2,
  scaleIcon: 1.5,
});
