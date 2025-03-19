import { Button, styled, Text, View, XStack, YStack } from 'tamagui';
import { RECORD_UNIT_LINE_HEIGHT } from '@/core/constants/size';

export const ViewContainer = styled(View, {
  p: '$4',
  animation: 'quick',
  animateOnly: ['opacity'],
  flex: 1,
  justify: 'space-between',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

export const TitleBox = styled(YStack, {
  gap: '$2',
});

export const CountBox = styled(XStack, {
  flex: 1,
  items: 'flex-end',
  gap: '$2',
});

export const CountUnitText = styled(Text, {
  lineHeight: RECORD_UNIT_LINE_HEIGHT,
  color: '$gray11',
});

export const MaximizeButton = styled(Button, {
  unstyled: true,
  self: 'flex-end',
  opacity: 0.2,
  scaleIcon: 1.5,
});
