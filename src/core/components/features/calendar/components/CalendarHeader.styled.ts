import { Button, H1, styled, XStack } from 'tamagui';
import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';

export const HeaderContainer = styled(HOSHeaderContainer, {
  flexDirection: 'column',
  items: 'stretch',
  gap: '$2',
  pb: '$2',
  bg: '$background',
});

export const NavigationBox = styled(XStack, {
  justify: 'space-between',
  items: 'center',
});

export const ArrowButton = styled(Button, {
  bg: 'transparent',
  scaleIcon: 1.5,
});

export const YearText = styled(H1, {
  fontSize: '$8',
});

export const DayContainer = styled(XStack, {
  justify: 'space-between',
  px: 36,
});
