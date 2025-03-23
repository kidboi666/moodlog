import { Button, styled } from 'tamagui';

export const MonthItemButton = styled(Button, {
  unstyled: true,
  rounded: '$8',
  py: '$4',
  scale: 1,
  opacity: 0.7,
  position: 'relative',

  variants: {
    isSelected: {
      true: {
        opacity: 1,
      },
    },
  } as const,
});
