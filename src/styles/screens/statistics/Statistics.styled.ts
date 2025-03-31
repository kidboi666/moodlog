import { styled, XStack, YStack } from 'tamagui';

import { ViewContainer as HOSContainer } from '@/core/components/shared/ViewContainer.styleable';

export const ViewContainer = styled(HOSContainer, {
  gap: '$4',
});

export const OrderBox = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
});
export const YStackContainer = styled(YStack, {
  gap: '$4',
});

export const XStackContainer = styled(XStack, {
  gap: '$4',
});
