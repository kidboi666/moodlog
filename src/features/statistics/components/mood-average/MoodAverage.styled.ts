import { styled, YStack } from 'tamagui';

export const CardContainer = styled(YStack, {
  flex: 1,
  p: '$4',
  justify: 'space-between',
  rounded: '$8',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});
