import { Button, Circle as TamaguiCircle, styled, XStack } from 'tamagui';
import {
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/styles';
import { Platform } from 'react-native';

export const TabBarContainer = styled(XStack, {
  elevation: '$8',
  position: 'absolute',
  b: 0,
  l: 0,
  r: 0,
  animation: 'medium',
  animateOnly: ENTER_STYLE_KEY,
  enterStyle: ENTER_STYLE,
  flexDirection: 'row',
  bg: '$gray5',
  borderTopRightRadius: '$12',
  borderTopLeftRadius: '$12',
});

export const Container = styled(XStack, {
  flex: 1,
  pt: Platform.OS === 'ios' ? '$4' : undefined,
  flexDirection: 'row',
  justify: 'space-evenly',
  items: 'center',
});

const TabButton = styled(Button, {
  bg: 'transparent',
  rounded: '$4',
  animation: 'medium',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
  color: '$gray9',
  scaleIcon: 1.5,

  variants: {
    isTabActive: {
      true: {
        color: '$gray12',
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
  position: 'relative',
});

export const Circle = styled(TamaguiCircle, {
  position: 'absolute',
  l: 8,
  t: 8,
  rounded: '$4',
  bg: '$green9',
  size: '$0.75',
  opacity: 0,

  variants: {
    showDraftNotification: {
      true: {
        opacity: 1,
      },
    },
  } as const,
});

export const RecordButton = styled(TabButton);

export const SettingsButton = styled(TabButton, {
  borderTopRightRadius: '$10',
});
