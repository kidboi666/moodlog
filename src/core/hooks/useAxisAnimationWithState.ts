import { useCallback, useEffect, useState } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimationAxis = 'x' | 'y';

interface Props<T> {
  defaultState: T;
  nextState: T;
  startValue: number;
  endValue: number;
  duration?: number;
}

export const useAxisAnimationWithState = <T>(
  axis: AnimationAxis,
  { defaultState, nextState, startValue, endValue, duration = 300 }: Props<T>,
) => {
  const [state, setState] = useState(defaultState);
  const translateValue = useSharedValue(startValue);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform:
        axis === 'y'
          ? [{ translateY: translateValue.value }]
          : [{ translateX: translateValue.value }],
    };
  });

  const toggleState = useCallback(() => {
    setState(prev => (prev === defaultState ? nextState : defaultState));
  }, [defaultState, nextState]);

  const changeStateByCondition = useCallback(
    (condition: boolean) => {
      setState(condition ? nextState : defaultState);
    },
    [defaultState, nextState],
  );

  useEffect(() => {
    translateValue.value = withTiming(
      state === defaultState ? startValue : endValue,
      {
        duration,
        easing: Easing.inOut(Easing.cubic),
      },
    );
  }, [state]);

  return {
    state,
    animatedStyle,
    toggleState,
    changeStateByCondition,
  };
};
