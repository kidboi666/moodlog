import React from 'react';
import { HomeScreen } from '@/features/home/screens/Home.screen';
import { StyleSheet } from 'react-native';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';

export default function Screen() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).easing(Easing.quad)}
    >
      <HomeScreen />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
