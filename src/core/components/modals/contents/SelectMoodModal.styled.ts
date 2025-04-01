import { styled, XStack, YStack } from 'tamagui';
import { BottomSheetContainer as HOSBottomSheetContainer } from '@/core/components/modals/BottomSheetContainer';

export const BottomSheetContainer = styled(HOSBottomSheetContainer);

export const XStackContainer = styled(XStack, {
  flex: 1,
  gap: '$3',
});

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$6',
});
