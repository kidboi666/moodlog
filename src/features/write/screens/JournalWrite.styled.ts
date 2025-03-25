import { styled, View, XStack } from 'tamagui';
import { Container as HOSContainer } from '@/core/components/Container.styleable';

export const ViewContainer = styled(HOSContainer, {
  gap: '$3',
  pl: 0,
});

export const HeaderWrapper = styled(View, {
  pl: '$4',
});

export const XStackContainer = styled(XStack, {
  flex: 1,
  gap: '$3',
});

const MoodBarBase = styled(View, {
  width: '3%',
  height: '100%',
  borderTopRightRadius: '$4',
  borderBottomRightRadius: '$4',
});

export const ColoredMoodBar = styled(MoodBarBase, {
  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  },
});

export const UncoloredMoodBar = styled(MoodBarBase, {
  bg: '$gray8',
});

export const ButtonsViewBox = styled(View, {
  items: 'center',
});
