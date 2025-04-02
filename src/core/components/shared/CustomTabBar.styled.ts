import { styled, View, XStack } from 'tamagui';
import { Platform } from 'react-native';
import { PressableButton } from '@/core/components/shared/ui/PressableButton.styled';

export const TabBarContainer = styled(XStack, {
  b: 0,
  l: 0,
  r: 0,
  bg: '$color5',
  elevation: 10,
  borderTopRightRadius: '$12',
  borderTopLeftRadius: '$12',
  width: '100%',
});

export const Container = styled(XStack, {
  flex: 1,
  pt: Platform.OS === 'ios' ? '$4' : undefined,
  flexDirection: 'row',
  justify: 'space-evenly',
  items: 'center',
});

export const WriteTabContainer = styled(View, {
  position: 'relative',
});

const TabButton = styled(PressableButton, {
  color: '$gray9',
  bg: '$gray4',
  elevate: false,

  variants: {
    isTabActive: {
      true: {
        color: '$gray11',
        bg: '$backgroundStrong',
      },
    },
  } as const,
});

export const WriteTabWrapper = styled(XStack, {
  position: 'absolute',
  z: 100,
  t: -60,
  x: '-50%',
  l: '50%',
  gap: '$2',
  bg: '$color12',
  rounded: '$4',
  animation: 'lazy',
  enterStyle: {
    y: 10,
    opacity: 0,
  },
  exitStyle: {
    y: 10,
    opacity: 0,
  },
  animateOnly: ['transform', 'opacity'],
});

export const WriteButton = styled(TabButton, {
  bg: '$color12',
  color: '$color1',
});

export const IconBox = styled(View, {
  animation: 'lazy',

  variants: {
    menuVisible: {
      true: {
        rotate: '45deg',
      },
      false: {
        rotate: '0deg',
      },
    },
  } as const,
});

export const HomeButton = styled(TabButton, {
  borderTopLeftRadius: '$9',
});

export const CalendarButton = styled(TabButton);

export const RecordButton = styled(TabButton);

export const SettingsButton = styled(TabButton, {
  borderTopRightRadius: '$9',
});
