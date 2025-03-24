import { styled, TextArea as TamaguiTextArea, YStack } from 'tamagui';

export const InputContainer = styled(YStack, {
  flex: 1,
  gap: '$2',
});

export const TextArea = styled(TamaguiTextArea, {
  unstyled: true,
  color: '$gray12',
  py: '$2',
  placeholderTextColor: '$gray7',
});
