import { EntriesScreen } from '@/features/entries/screens/Entries.screen';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

export default function Screen() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).easing(Easing.quad)}
    >
      <EntriesScreen />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
