import {
  Image as TamaguiImage,
  styled,
  TextArea as TamaguiTextArea,
  YStack,
} from 'tamagui';

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

export const Image = styled(TamaguiImage, {
  width: 200,
  height: 200,
  mx: 'auto',
  rounded: 12,
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 10,
});
