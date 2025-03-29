import { useCallback, useState } from 'react';
import { ExpansionState } from '@/types/statistic.types';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';

export const useExpandAnimation = () => {
  const [expansionState, setExpansionState] = useState<ExpansionState>(
    ExpansionState.COLLAPSED,
  );
  const height = useSharedValue(RECORD_CARD_HEIGHT);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const handlePress = useCallback(() => {
    const newState =
      expansionState === ExpansionState.EXPANDED
        ? ExpansionState.COLLAPSED
        : ExpansionState.EXPANDED;

    setExpansionState(newState);

    height.value = withSpring(
      newState === ExpansionState.EXPANDED
        ? RECORD_CARD_EXPANDED_HEIGHT
        : RECORD_CARD_HEIGHT,
    );
  }, [expansionState, height]);

  return {
    expansionState,
    animatedStyle,
    onPress: handlePress,
  };
};
