import { Button, Separator as TamaguiSeparator, styled, XGroup } from 'tamagui';

export const XGroupContainer = styled(XGroup, {
  position: 'absolute',
  r: 0,
  b: 12,
});

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
});

export const ActionButton = styled(Button);

export const SubmitButton = styled(ActionButton, {
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});
