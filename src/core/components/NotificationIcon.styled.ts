import { Circle as TamaguiCircle, styled } from 'tamagui';

export const Circle = styled(TamaguiCircle, {
  position: 'absolute',
  l: 8,
  t: 8,
  rounded: '$4',
  bg: '$green9',
  opacity: 0,
  width: '$0.75',
  height: '$0.75',

  variants: {
    showDraftNotification: {
      true: {
        opacity: 1,
      },
    },
  } as const,
});
