import React from 'react';
import { JournalScreen } from '@/features/journal/screens/Journal.screen';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

export default function Screen() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).easing(Easing.quad)}
    >
      <JournalScreen />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
