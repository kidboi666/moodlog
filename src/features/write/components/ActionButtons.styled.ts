import { Button, Separator as TamaguiSeparator, styled, XGroup } from 'tamagui';
import { PressableButton } from '@/core/components/ui/PressableButton.styled';

export const XGroupContainer = styled(XGroup, {
  position: 'absolute',
  r: 0,
  b: 12,
});

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
});

export const ActionButton = styled(PressableButton, {
  elevate: false,
});

export const SubmitButton = styled(Button, {
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});
