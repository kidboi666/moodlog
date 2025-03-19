import { Button, styled, Text, YStack } from 'tamagui';

export const DayContainerButton = styled(Button, {
  unstyled: true,
  width: '$4',
  height: '$4',
  justify: 'center',
  borderColor: '$gray6',
  rounded: '$4',

  variants: {
    isSelected: {
      true: {
        bg: '$gray11',
      },
      false: {
        bg: 'transparent',
      },
    },
    isToday: {
      true: {
        borderWidth: 3,
      },
    },
    isDisabled: {
      true: {
        opacity: 0.2,
      },
    },
  } as const,
});

export const DotBox = styled(YStack, {
  items: 'center',
});

export const DayText = styled(Text, {
  p: 0,

  variants: {
    isSelected: {
      true: {
        color: '$gray6',
      },
      false: {
        color: '$gray12',
      },
    },
  } as const,
});
