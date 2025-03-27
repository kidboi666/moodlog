import { Button, styled, View } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';

const TabButton = styled(Button, {
  color: '$gray9',
  scaleIcon: 1.5,
  animation: 'medium',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,

  variants: {
    isTabActive: {
      true: {
        color: '$gray12',
        bg: '$gray7',
      },
    },
  } as const,
});

export const HomeButton = styled(TabButton, {
  borderTopLeftRadius: '$10',
});

export const CalendarButton = styled(TabButton);

export const WriteButton = styled(TabButton, {
  bg: '$gray1',
});

export const WriteInnerBox = styled(View, {
  position: 'relative',
  px: '$4',
  py: '$3',
});

export const RecordButton = styled(TabButton);

export const SettingsButton = styled(TabButton, {
  borderTopRightRadius: '$10',
});
