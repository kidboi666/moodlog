import {
  Progress as TamaguiProgress,
  styled,
  Text,
  XStack,
  YStack,
} from 'tamagui';

export const GraphContainer = styled(YStack, {
  gap: '$2',
});

export const GraphNameBox = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
});

export const GraphName = styled(Text, {
  color: '$gray9',
});

export const Progress = styled(TamaguiProgress, {
  size: '$1',
  height: 20,
});

export const ProgressIndicator = styled(TamaguiProgress.Indicator, {
  animation: 'bouncy',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  },
});
