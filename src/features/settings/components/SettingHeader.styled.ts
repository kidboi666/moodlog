import { styled, View } from 'tamagui';
import { PressableButton } from '@/core/components/ui/PressableButton.styled';

export const BackButton = styled(PressableButton, {
  elevate: false,
  bg: '$backgroundTransparent',
});

export const RestBox = styled(View, {
  flex: 1,
});
