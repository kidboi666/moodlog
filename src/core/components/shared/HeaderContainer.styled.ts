import { styled, XStack } from 'tamagui';
import { Platform } from 'react-native';
import { CONTAINER_HORIZONTAL_PADDING } from '@/core/constants/size';

export const HeaderContainer = styled(XStack, {
  pt:
    Platform.OS === 'ios'
      ? CONTAINER_HORIZONTAL_PADDING
      : CONTAINER_HORIZONTAL_PADDING * 2,
  justify: 'space-between',
  items: 'center',

  variants: {
    topEdge: {
      ':number': mt => {
        return { mt };
      },
    },
    bottomEdge: {
      ':number': mb => {
        return { mb };
      },
    },
  } as const,
});
