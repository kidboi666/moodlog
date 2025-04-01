import { H2, styled, View, XStack } from 'tamagui';
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations';

export const ViewContainer = styled(View, {
  height: 120,
  items: 'center',
  justify: 'center',
});

export const XStackContainer = styled(XStack, {
  gap: '$2',
  justify: 'center',
  animation: 'medium',
  position: 'absolute',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
});

export const MoodLevelText = styled(H2, {
  color: '$gray11',
});

export const MoodTypeText = styled(H2);
