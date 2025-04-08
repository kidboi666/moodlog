import { Text, styled } from 'tamagui';

import { PressableButton } from '@/core/components/shared/PressableButton.styled';

export const SettingsNavigationButton = styled(PressableButton, {
  elevate: false,
  justify: 'flex-start',
  bg: '$background',
  scaleIcon: 1.2,
  size: '$5',
  fontSize: '$6',
});

export const ItemLabel = styled(Text, {
  fontSize: '$5',
  flex: 1,
});
