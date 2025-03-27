import { Button, styled, Text, View, XStack, YStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';

export const XStackContainer = styled(XStack, {
  justify: 'space-between',
});

export const MoodTypeContainer = styled(YStack, {
  gap: '$4',
  items: 'center',
});

export const MoodLevelContainer = styled(YStack, {
  gap: '$4',
});

export const MoodLevelButton = styled(Button, {
  size: '$5',
  animation: 'medium',
  pressStyle: PRESS_STYLE,
  animateOnly: PRESS_STYLE_KEY,

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  },
});

export const SelectedMoodBox = styled(View);

export const SelectedMoodText = styled(Text, {
  fontSize: '$4',
  color: '$gray11',
  fontWeight: '400',
});
