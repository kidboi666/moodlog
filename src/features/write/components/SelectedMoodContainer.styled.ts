import { H2, styled, View, XStack } from 'tamagui';
import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/core/styles/animations';

export const ViewContainer = styled(View, {
  flex: 1,
  items: 'center',
  justify: 'center',
});

export const XStackContainer = styled(XStack, {
  gap: '$2',
  justify: 'center',
  animation: 'bouncy',
  position: 'absolute',
  animateOnly: ENTER_STYLE_KEY,
  enterStyle: ENTER_STYLE,
  exitStyle: ENTER_STYLE,
});

export const MoodLevelText = styled(H2, {
  color: '$gray11',
});

export const MoodTypeText = styled(H2);
