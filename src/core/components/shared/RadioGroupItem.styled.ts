import { RadioGroup, styled, Text } from 'tamagui';
import { PressableButton } from '@/core/components/shared/ui/PressableButton.styled';
import { MOUNT_STYLE } from '@/styles/animations';

export const RadioGroupContainerButton = styled(PressableButton, {
  elevate: false,
  width: '100%',
  justify: 'flex-start',
  bg: '$background',
  size: '$5',
});

export const RadioItemLabel = styled(Text, {
  fontSize: '$5',
  flex: 1,
});

export const StyledRadioGroupItem = styled(RadioGroup.Item);

export const StyledRadioGroupIndicator = styled(RadioGroup.Indicator, {
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
});
