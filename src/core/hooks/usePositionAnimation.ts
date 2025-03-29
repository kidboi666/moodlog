import { useEffect, useState } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Position } from '@/types/app.types';

type Orientation = 'horizontal' | 'vertical';

interface Props {
  condition: boolean;
  initialPosition: Position;
  nextPosition: Position;
  initialValue: number;
  nextValue: number;
  duration?: number;
}

export const usePositionAnimation = (
  orientation: Orientation,
  {
    condition,
    initialPosition,
    nextPosition,
    initialValue,
    nextValue,
    duration = 500,
  }: Props,
) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const animationValue = useSharedValue(initialValue);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform:
        orientation === 'vertical'
          ? [{ translateY: animationValue.value }]
          : [{ translateX: animationValue.value }],
    };
  });

  useEffect(() => {
    const newPosition = condition ? nextPosition : initialPosition;
    setPosition(newPosition);

    animationValue.value = withTiming(
      newPosition === initialPosition ? nextValue : initialValue,
      {
        duration,
        easing: Easing.inOut(Easing.sin),
      },
    );
  }, [condition]);

  return {
    position,
    animatedStyle,
  };
};
