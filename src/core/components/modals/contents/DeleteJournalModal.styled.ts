import { H3, Paragraph, styled, YStack } from 'tamagui';
import { PressableButton } from '@/core/components/shared/ui/PressableButton.styled';
import { BottomSheetContainer as HOSBottomSheetContainer } from '@/core/components/modals/BottomSheetContainer';

export const BottomSheetContainer = styled(HOSBottomSheetContainer);

export const ModalTitle = styled(H3, {
  text: 'center',
});

export const ModalDescription = styled(Paragraph, {
  text: 'center',
  color: '$gray11',
});

export const ModalContentYStack = styled(YStack, {
  gap: '$3',
  mt: '$2',
});

export const ConfirmButton = styled(PressableButton, {
  bg: '$red9',
  color: 'white',
  fontWeight: '800',
});

export const CancelButton = styled(PressableButton, {
  fontWeight: '800',
  elevate: false,
});
