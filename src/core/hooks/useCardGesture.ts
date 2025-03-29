import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

interface CardGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onLongPress: () => void;
}

export const useCardGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onLongPress,
}: CardGestureProps) => {
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onEnd(event => {
      if (event.velocityX < -500 || event.translationX < -50) {
        runOnJS(onSwipeLeft)();
      } else if (event.velocityX > 500 || event.translationX > 50) {
        runOnJS(onSwipeRight)();
      }
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      runOnJS(onLongPress)();
    });

  const gesture = Gesture.Exclusive(panGesture, longPressGesture);

  return {
    gesture,
    GestureWrapper: GestureDetector,
  };
};
