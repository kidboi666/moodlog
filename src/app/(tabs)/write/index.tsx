import { MoodSelectScreen } from '@/features/write/screens/MoodSelect.screen';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';

export default function Screen() {
  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeIn.duration(500).easing(Easing.quad)}
    >
      <MoodSelectScreen />
    </Animated.View>
  );
}
