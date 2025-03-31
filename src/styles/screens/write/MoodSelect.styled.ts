import { styled, XStack, YStack } from 'tamagui';
import { Container as HOSContainer } from '@/core/components/shared/Container.styleable';

export const ViewContainer = styled(HOSContainer.View, {
  pr: 0,
});

export const XStackContainer = styled(XStack, {
  flex: 1,
  gap: '$3',
});

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$6',
});
