import { H5, styled, Text, View, YStack } from 'tamagui';

export const ViewContainer = styled(View, {
  flex: 1,
  justify: 'space-between',
  animation: 'quick',
  animateOnly: ['opacity'],
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

export const YStackContainer = styled(YStack, {
  gap: '$2',
});

export const Title = styled(H5, {
  fontWeight: '800',
});

export const Description = styled(Text);
