import { Button, Group, Separator as TamaguiSeparator, styled } from 'tamagui';

export const XGroupBox = styled(Group);

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
});

export const TimeRangeButton = styled(Button, {
  variants: {
    isSelected: {
      true: {
        bg: '$gray6',
      },
    },
  } as const,
});
