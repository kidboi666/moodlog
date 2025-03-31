import { styled, XStack, YStack } from 'tamagui';
import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';
import { CONTAINER_HORIZONTAL_PADDING } from '@/core/constants/size';
import { RenderTime } from '@/core/components/shared/RenderTime.styleable';
import { RenderDay } from '@/core/components/shared/RenderDay.styleable';
import { RenderDate } from '@/core/components/shared/RenderDate.styleable';
import { PressableButton } from '@/core/components/shared/ui/PressableButton.styled';

export const HeaderContainer = styled(HOSHeaderContainer, {
  items: 'center',
  pl: CONTAINER_HORIZONTAL_PADDING,
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

export const BackButton = styled(PressableButton);

export const DeleteButton = styled(PressableButton);
