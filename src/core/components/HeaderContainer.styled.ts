import { styled, XStack } from 'tamagui';
import { Platform } from 'react-native';
import { CONTAINER_SPACING } from '@/core/constants/size';

export const HeaderContainer = styled(XStack, {
  pt: Platform.OS === 'ios' ? CONTAINER_SPACING : CONTAINER_SPACING * 2,
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
