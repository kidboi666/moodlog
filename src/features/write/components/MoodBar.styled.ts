import { styled, View } from 'tamagui';

export const MoodBar = styled(View, {
  width: '3%',
  height: '100%',
  borderTopLeftRadius: '$4',
  borderBottomLeftRadius: '$4',
  animation: 'medium',
  animateOnly: ['opacity'],
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  },
});
