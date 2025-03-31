import { styled, YStack } from 'tamagui';

import { ViewContainer as HOSContainer } from '@/core/components/shared/ViewContainer.styleable';

export const ViewContainer = styled(HOSContainer, {
  gap: '$4',
});

export const ItemContainer = styled(YStack, {
  gap: '$4',
});
