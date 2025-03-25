import { Button, Separator as TamaguiSeparator, styled, XGroup } from 'tamagui';

export const XGroupContainer = styled(XGroup, {
  position: 'absolute',
  r: 0,
  b: 12,
});

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
});

export const SubmitButton = styled(Button, {
  variants: {
    isDisabled: {
      true: {
        opacity: 0.2,
      },
    },
  } as const,
});
