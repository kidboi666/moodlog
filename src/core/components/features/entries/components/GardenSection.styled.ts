import { styled, XStack, YStack } from 'tamagui';

export const Container = styled(YStack, {
  bg: '$gray4',
  p: '$4',
  rounded: '$8',
  gap: '$4',
});

export const StackBox = styled(XStack, {
  gap: '$2',
});
