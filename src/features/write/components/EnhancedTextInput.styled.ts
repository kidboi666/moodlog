import {
  Input as TamaguiInput,
  styled,
  TextArea as TamaguiTextArea,
  YStack,
} from 'tamagui';

export const InputContainer = styled(YStack, {
  flex: 1,
  gap: '$2',
  animation: 'quick',
  enterStyle: {
    opacity: 0,
    scale: 0.95,
  },
  animateOnly: ['opacity', 'transform'],
});

export const Input = styled(TamaguiInput, {
  unstyled: true,
  fontWeight: '800',
  py: '$2',
  color: '$gray12',
  placeholderTextColor: '$gray7',
});

export const TextArea = styled(TamaguiTextArea, {
  unstyled: true,
  color: '$gray12',
  py: '$2',
  placeholderTextColor: '$gray7',
});
