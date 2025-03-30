import { JournalWriteScreen } from '@/features/write/screens/JournalWrite.screen';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';

export default function Screen() {
  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeIn.duration(500).easing(Easing.quad)}
    >
      <JournalWriteScreen />
    </Animated.View>
  );
}
