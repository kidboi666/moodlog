import { styled, XStack } from 'tamagui';
import { Container as HOSContainer } from '@/core/components/Container.styleable';

export const CardContainer = styled(HOSContainer, {
  gap: '$4',
});

export const OrderBox = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
});
