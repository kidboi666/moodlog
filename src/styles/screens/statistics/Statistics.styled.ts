import { styled, XStack, YStack } from 'tamagui';
import { Container as HOSContainer } from '@/core/components/shared/Container.styleable';

export const ScrollViewContainer = styled(HOSContainer.ScrollView, {
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
