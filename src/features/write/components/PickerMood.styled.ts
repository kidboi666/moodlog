import { styled, Text, View, XStack, YStack } from 'tamagui';
import { PressableButton } from '@/core/components/ui/PressableButton.styled';

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

export const MoodLevelButton = styled(PressableButton, {
  size: '$5',

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
