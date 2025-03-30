import { SettingsScreen } from '@/features/settings/screens/Settings.screen';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

export default function Screen() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).easing(Easing.quad)}
    >
      <SettingsScreen />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
