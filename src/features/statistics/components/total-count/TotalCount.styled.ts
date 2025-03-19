import { styled, YStack } from 'tamagui';
import { PRESS_STYLE } from '@/core/constants/styles';

export const CardContainer = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  p: '$4',
  animation: 'bouncy',
  pressStyle: PRESS_STYLE,
});
