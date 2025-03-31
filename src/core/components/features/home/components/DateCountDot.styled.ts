import { styled, View, XStack } from 'tamagui';

export const DotContainer = styled(XStack, {
  gap: 2,
  position: 'absolute',
  b: '$1',
});

export const Dot = styled(View, {
  width: '$0.5',
  height: '$0.5',
  b: -8,
  rounded: '$1',

  variants: {
    backgroundStyle: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});
