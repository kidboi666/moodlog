import { styled, View } from 'tamagui';
import {
  CONTAINER_PADDING_BOTTOM,
  CONTAINER_SPACING,
} from '@/core/constants/size';

export const Container = styled(View, {
  flex: 1,
  px: CONTAINER_SPACING,
  pb: 0,

  variants: {
    padded: {
      true: {
        pb: CONTAINER_PADDING_BOTTOM,
      },
    },
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
