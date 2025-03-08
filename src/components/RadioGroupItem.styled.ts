import { Button, RadioGroup, styled, Text, XStack } from 'tamagui';
import { PRESS_STYLE } from '@/constants/styles';

export const RadioGroupContainerButton = styled(Button, {
  unstyled: true,
  animation: 'medium',
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
