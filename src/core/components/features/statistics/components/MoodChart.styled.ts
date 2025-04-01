import { styled, Text, View, XStack, YStack } from 'tamagui';

export const YStackContainer = styled(YStack, {
  flex: 1,
  rounded: '$8',
  bg: '$color4',
  p: '$4',
  gap: '$3',
});

export const ChartBox = styled(XStack, {
  flex: 1,
});

export const AnimatedBox = styled(XStack, {
  gap: '$4',
  height: '$2',
});

export const AnimatedText = styled(Text, {
  fontWeight: '600',
  color: '$color10',
});

export const ChartItemContainer = styled(View, {
  flex: 1,
});

export const ChartItem = styled(View, {
  height: '$1',
  rounded: '$4',
  width: '100%',

  variants: {
    moodColor: {
      ':string': bg => {
        return {
          bg,
        };
      },
    },
  } as const,
});

export const PercentageText = styled(Text, {
  fontSize: '$1',
  color: '$color10',
  mt: '$1',
});
