import { styled } from 'tamagui';
import { LinearGradient as TamaguiLinearGradient } from 'tamagui/linear-gradient';

export const LinearGradient = styled(TamaguiLinearGradient, {
  position: 'absolute',
  t: 0,
  l: 0,
  r: 0,
  height: 80,
  z: 100,
  start: [0, 0],
  end: [0, 1],
});
