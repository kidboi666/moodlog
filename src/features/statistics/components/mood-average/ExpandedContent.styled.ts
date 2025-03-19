import { Button, styled, View, YStack } from 'tamagui';

export const ViewContainer = styled(View, {
  animation: 'quick',
  animateOnly: ['opacity'],
  justify: 'space-between',
  flex: 1,
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$4',
  justify: 'space-between',
});

export const TitleBox = styled(YStack, {
  gap: '$2',
});

export const MoodGraphBox = styled(YStack, {
  flex: 1,
  justify: 'space-between',
});

export const MinimizeButton = styled(Button, {
  unstyled: true,
  self: 'flex-end',
  opacity: 0.2,
  scaleIcon: 1.5,
});
