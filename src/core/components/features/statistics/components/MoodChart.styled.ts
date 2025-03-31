import { styled, Text, View, XStack, YStack } from 'tamagui';

export const YStackContainer = styled(YStack, {
  flex: 1,
  rounded: '$8',
  bg: '$color4',
  p: '$4',
  gap: '$3',
});

export const AnimatedBox = styled(XStack, {
  flex: 1,
  height: '$2',
  justify: 'flex-start',
  items: 'center',
  gap: '$4',
});

export const AnimatedText = styled(Text, {
  fontWeight: '600',
  color: '$color10',
  minW: 30, // 텍스트 너비를 고정하여 정렬 유지
});

export const ChartItemContainer = styled(View, {
  flex: 1, // 부모의 가용 공간을 균등하게 차지
  items: 'center',
});

export const ChartItem = styled(View, {
  height: '$1',
  rounded: '$4',

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
