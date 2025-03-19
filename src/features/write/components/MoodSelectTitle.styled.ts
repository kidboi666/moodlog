import { H3, styled, View } from 'tamagui';

export const ViewContainer = styled(View, {
  animation: 'bouncy',
  enterStyle: {
    opacity: 0,
    y: 10,
  },
  exitStyle: {
    opacity: 0,
    y: 10,
  },
});

export const Title = styled(H3, {
  fontWeight: '800',
});
