import { Button, H3, styled, XStack, YStack } from 'tamagui';

export const WelcomeContainer = styled(YStack, {
  flex: 1,
});

export const WelcomeContent = styled(YStack, {
  flex: 1,
  gap: '$6',
});

export const TitleBox = styled(XStack, {
  gap: '$2',
});

export const DescriptionBox = styled(YStack, {
  gap: '$6',
});

export const Description1 = styled(H3, {
  color: '$gray11',
  mb: '$4',
});

export const Description2 = styled(H3, {
  color: '$gray11',
});

export const NextButton = styled(Button, {
  mt: '$8',
  self: 'flex-end',
  size: '$5',
  scaleIcon: 1.5,
  animation: 'quick',
});
