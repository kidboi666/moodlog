import { styled, View } from 'tamagui';

export const Grass = styled(View, {
  width: 16,
  height: 16,
  rounded: '$1',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});
