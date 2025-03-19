import { H6, styled, View } from 'tamagui';

export const ViewContainer = styled(View, {
  height: '$2',
});

export const MonthText = styled(H6, {
  fontSize: '$4',
  fontWeight: '600',
  color: '$gray10',

  variants: {
    isSelected: {
      true: {
        color: '$gray12',
      },
    },
  } as const,
});
