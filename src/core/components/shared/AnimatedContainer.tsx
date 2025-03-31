import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { PropsWithChildren } from 'react';
import { ScrollViewProps, StyleSheet, ViewProps } from 'react-native';

const AnimatedView = ({ children, ...props }: PropsWithChildren<ViewProps>) => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).easing(Easing.quad)}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

const AnimatedScrollView = ({
  children,
  ...props
}: PropsWithChildren<ScrollViewProps>) => {
  return (
    <Animated.ScrollView
      style={styles.container}
      entering={FadeIn.duration(500).easing(Easing.quad)}
      {...props}
    >
      {children}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const AnimatedContainer = {
  View: AnimatedView,
  ScrollView: AnimatedScrollView,
};
