import { styled, YStack } from 'tamagui';
import { Container as HOSContainer } from '@/core/components/shared/Container.styleable';

export const ScrollViewContainer = styled(HOSContainer.ScrollView, {
  gap: '$4',
});

export const ItemContainer = styled(YStack, {
  gap: '$4',
});
