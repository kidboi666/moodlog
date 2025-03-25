import { Button, RadioGroup, styled, Text, XStack } from 'tamagui';
import { PRESS_STYLE } from '@/core/styles/animations';

export const RadioGroupContainerButton = styled(Button, {
  unstyled: true,
  animation: 'quick',
  rounded: '$4',
  pressStyle: PRESS_STYLE,
});

export const ContentContainer = styled(XStack, {
  items: 'center',
  width: '100%',
  gap: '$4',
  p: '$5',
  justify: 'space-between',
});

export const RadioItemLabel = styled(Text, {
  fontSize: '$6',
});

export const StyledRadioGroupItem = styled(RadioGroup.Item, {});

export const StyledRadioGroupIndicator = styled(RadioGroup.Indicator, {});
