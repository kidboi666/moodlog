import { styled, YStack } from 'tamagui';
import { Container as HOSContainer } from '@/core/components/Container.styleable';

export const Container = styled(HOSContainer, {
  gap: '$4',
});

export const ItemContainer = styled(YStack, {
  gap: '$4',
});
