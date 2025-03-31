import { styled } from 'tamagui';
import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';
import { PressableButton } from '@/core/components/shared/ui/PressableButton.styled';

export const HeaderContainer = styled(HOSHeaderContainer);

export const BackButton = styled(PressableButton, {
  elevate: false,
  bg: '$backgroundTransparent',
});
