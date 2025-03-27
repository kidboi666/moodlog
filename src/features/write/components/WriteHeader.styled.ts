import { Button, styled } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';
import { HeaderContainer as HOSHeaderContainer } from '@/core/components/HeaderContainer.styleable';

export const HeaderContainer = styled(HOSHeaderContainer, {});

export const BackButton = styled(Button, {
  unstyled: true,
  p: '$3',
  rounded: '$4',
  scaleIcon: 1.5,
  animation: 'quick',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
});
