import { styled, Text, View, XStack, YStack } from 'tamagui';

export const YStackContainer = styled(YStack, {
  flex: 1,
  rounded: '$8',
  bg: '$color4',
  p: '$4',
  gap: '$2',
});

export const AnimatedBox = styled(XStack, {
  flex: 1,
  height: '$2',
  items: 'center',
  gap: '$4',
});

export const AnimatedText = styled(Text, {
  fontWeight: '600',
  color: '$color10',
});

export const ChartItemContainer = styled(View, {
  items: 'center',
});

export const ChartItem = styled(View, {
  width: 40,
  height: '$2',
  rounded: '$4',
  bg: '$blue10',
});
