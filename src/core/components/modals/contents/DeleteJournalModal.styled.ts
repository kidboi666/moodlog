import { Button, H3, Paragraph, styled, YStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/core/constants/styles';

export const ModalContainer = styled(YStack, {
  gap: '$4',
});

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

export const ConfirmButton = styled(Button, {
  animation: 'quick',
  bg: '$red9',
  color: 'white',
  fontWeight: '800',
  pressStyle: PRESS_STYLE,
});

export const CancelButton = styled(Button, {
  animation: 'quick',
  animateOnly: PRESS_STYLE_KEY,
  fontWeight: '800',
  pressStyle: PRESS_STYLE,
});
