import { styled, Text } from 'tamagui';
import { PressableButton } from '@/core/components/ui/PressableButton.styled';

export const SettingsNavigationButton = styled(PressableButton, {
  elevate: false,
  justify: 'flex-start',
  bg: '$backgroundTransparent',
  size: '$5',
  fontSize: '$6',
});

export const ItemLabel = styled(Text, {
  fontSize: '$6',
  flex: 1,
});
