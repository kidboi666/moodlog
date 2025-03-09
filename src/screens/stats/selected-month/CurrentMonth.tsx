import { AnimatePresence, useEvent } from 'tamagui';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT_MEDIUM,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { useStatistics } from '@/store/hooks/useStatistics';
import { ExpandedContent } from '@/screens/stats/selected-month/ExpandedContent';
import { CollapsedContent } from '@/screens/stats/selected-month/CollapsedContent';
import { EmptyContent } from '@/screens/stats/EmptyContent';
import * as S from './CurrentMonth.styled';

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

export const CurrentMonth = () => {
  const { selectedMonthStats } = useStatistics();
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT_MEDIUM : RECORD_CARD_HEIGHT,
    ),
    transform: [{ scale: withSpring(isTouched.value ? 0.9 : 1) }],
    opacity: withTiming(isTouched.value ? 0.6 : 1),
  }));

  return (
    <AnimatedCard
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      onPress={() => (selectedMonthStats ? onPress() : undefined)}
      style={animatedStyle}
    >
      <AnimatePresence>
        {!selectedMonthStats || selectedMonthStats.count === 0 ? (
          <EmptyContent />
        ) : isExpanded ? (
          <ExpandedContent selectedMonthStats={selectedMonthStats} />
        ) : (
          <CollapsedContent selectedMonthStats={selectedMonthStats} />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
