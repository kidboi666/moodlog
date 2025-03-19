import { Button, styled } from 'tamagui';

export const MonthItemButton = styled(Button, {
  unstyled: true,
  animation: 'medium',
  animateOnly: ['transform', 'opacity'],
  rounded: '$8',
  py: '$4',
  scale: 1,
  opacity: 0.7,
  position: 'relative',
  z: 1,

  variants: {
    isSelected: {
      true: {
        scale: 1.14,
        opacity: 1,
        z: 100,
      },
    },
  } as const,
});
