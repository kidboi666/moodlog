import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT_MEDIUM,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';
import { useStatistics } from '@/core/store/hooks/useStatistics';
import { ExpandedContent } from '@/features/statistics/components/selected-month/ExpandedContent';
import { CollapsedContent } from '@/features/statistics/components/selected-month/CollapsedContent';
import { EmptyContent } from '@/features/statistics/components/EmptyContent';
import * as S from './CurrentMonth.styled';

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

export const CurrentMonth = () => {
  const { selectedMonthStats } = useStatistics();
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const onPress = () => {
    if (selectedMonthStats) {
      setIsExpanded(prev => !prev);
      return;
    }
    return undefined;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT_MEDIUM : RECORD_CARD_HEIGHT,
    ),
    transform: [{ scale: withSpring(isTouched.value ? 0.9 : 1) }],
    opacity: withSpring(isTouched.value ? 0.6 : 1),
  }));

  return (
    <AnimatedCard
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      onPress={onPress}
      style={animatedStyle}
    >
      {!selectedMonthStats || selectedMonthStats.count === 0 ? (
        <EmptyContent />
      ) : isExpanded ? (
        <ExpandedContent selectedMonthStats={selectedMonthStats} />
      ) : (
        <CollapsedContent selectedMonthStats={selectedMonthStats} />
      )}
    </AnimatedCard>
  );
};
