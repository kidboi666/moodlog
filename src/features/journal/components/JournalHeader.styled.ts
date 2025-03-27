import { Button, styled, XStack, YStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';
import { HeaderContainer as HOSHeaderContainer } from '@/core/components/HeaderContainer.styleable';
import { CONTAINER_SPACING } from '@/core/constants/size';
import { RenderTime } from '@/core/components/RenderTime.styleable';
import { RenderDay } from '@/core/components/RenderDay.styleable';
import { RenderDate } from '@/core/components/RenderDate.styleable';

export const HeaderContainer = styled(HOSHeaderContainer, {
  items: 'center',
  pl: CONTAINER_SPACING,
});

export const DateContainer = styled(YStack, {
  items: 'center',
});

export const TimeText = styled(RenderTime, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DayText = styled(RenderDay, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DateText = styled(RenderDate, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DayWithTimeBox = styled(XStack, {
  gap: '$2',
});

export const BackButton = styled(Button, {
  scaleIcon: 1.5,
  animation: 'medium',
  pressStyle: PRESS_STYLE,
  animateOnly: PRESS_STYLE_KEY,
});

export const DeleteButton = styled(Button, {
  scaleIcon: 1.5,
  animation: 'medium',
  pressStyle: PRESS_STYLE,
  animateOnly: PRESS_STYLE_KEY,
});
