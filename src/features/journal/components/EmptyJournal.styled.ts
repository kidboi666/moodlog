import { Button, H3, H5, styled, YStack } from 'tamagui';
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations';
import { PressableButton } from '@/core/components/ui/PressableButton.styled';

export const TodayContainer = styled(YStack, {
  justify: 'center',
  items: 'center',
  gap: '$3',
  p: '$6',
  px: '$9',
  rounded: '$8',
  bg: '$gray4',
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
});

export const TodayTitle = styled(H3, {
  text: 'center',
  color: '$gray12',
});

export const WriteButton = styled(PressableButton, {
  themeInverse: true,
});

export const PastDaysContainer = styled(Button, {
  unstyled: true,
  p: '$6',
  justify: 'center',
  items: 'center',
  gap: '$3',
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
});

export const PastDaysTitle = styled(H3, {
  color: '$gray10',
});

export const PastDaysDescription = styled(H5, {
  color: '$gray10',
  fontSize: '$4',
});
