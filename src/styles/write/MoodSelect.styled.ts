import { styled, XStack, YStack } from 'tamagui';
import { Container as HOSContainer } from '@/components/layouts/containers/Container';

export const ViewContainer = styled(HOSContainer, {
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
