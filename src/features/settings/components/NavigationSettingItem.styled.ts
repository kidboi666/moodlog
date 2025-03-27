import { Button, styled } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations';

export const SettingsNavigationButton = styled(Button, {
  unstyled: true,
  animation: 'medium',
  animateOnly: PRESS_STYLE_KEY,
  flexDirection: 'row',
  scaleIcon: 1.5,
  rounded: '$4',
  gap: '$2',
  fontSize: '$6',
  pressStyle: PRESS_STYLE,
  p: '$5',
});
