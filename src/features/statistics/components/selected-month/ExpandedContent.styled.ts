import { Button, H2, H3, H5, styled, Text, XStack, YStack } from 'tamagui';

export const MonthlyStatsContainer = styled(YStack, {
  animation: 'quick',
  animateOnly: ['opacity'],
  flex: 1,
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

export const EmotionSummaryHeader = styled(XStack, {
  justify: 'space-between',
  items: 'center',
  rounded: '$8',
  p: '$4',
  // bg는 동적으로 적용
});

export const SignatureEmotionLabel = styled(H3, {
  fontWeight: '800',
  color: '$gray1',
});

export const SignatureEmotionValue = styled(H2, {
  color: '$gray1',
});

export const StatsDetailContainer = styled(YStack, {
  flex: 1,
  justify: 'space-between',
  p: '$4',
});

export const StatsSectionBox = styled(YStack, {
  gap: '$2',
});

export const StatsSectionTitle = styled(H5, {
  fontWeight: '800',
});

export const StatsSectionDescription = styled(Text, {
  color: '$gray11',
});

export const MinimizeButton = styled(Button, {
  unstyled: true,
  self: 'flex-end',
  scaleIcon: 1.5,
  opacity: 0.2,
});
