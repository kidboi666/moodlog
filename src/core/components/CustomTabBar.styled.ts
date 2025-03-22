import { Button, styled, View, XStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/core/constants/styles';
import { Platform } from 'react-native';

export const TabBarContainer = styled(XStack, {
  position: 'absolute',
  b: 0,
  l: 0,
  r: 0,
  elevation: '$10',
  borderTopRightRadius: '$12',
  borderTopLeftRadius: '$12',
  borderWidth: 1,
  borderBottomWidth: 0,
  borderColor: '$gray7',
  bg: '$gray4',
  width: '100%',
  animation: 'lazy',
  animateOnly: ['transform'],
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

export const CalendarButton = styled(TabButton, {});

export const WriteButton = styled(TabButton, {
  unstyled: true,
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
