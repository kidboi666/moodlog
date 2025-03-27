import { styled, XStack } from 'tamagui';
import { Platform } from 'react-native';

export const TabBarContainer = styled(XStack, {
  position: 'absolute',
  b: 0,
  l: 0,
  r: 0,
  elevation: '$10',
  borderTopRightRadius: '$12',
  borderTopLeftRadius: '$12',
  borderBottomWidth: 0,
  borderColor: '$gray7',
  bg: '$gray5',
  width: '100%',
  animation: 'lazy',
  animateOnly: ['transform'],

  variants: {
    showTabBar: {
      show: {
        y: 0,
      },
      hide: {
        y: 140,
      },
    },
  } as const,
});

export const Container = styled(XStack, {
  flex: 1,
  pt: Platform.OS === 'ios' ? '$4' : undefined,
  flexDirection: 'row',
  justify: 'space-evenly',
  items: 'center',
});
