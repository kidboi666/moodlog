import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { memo, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ExpandedContent } from '@/screens/stats/total-count/ExpandedContent';
import { CollapsedContent } from '@/screens/stats/total-count/CollapsedContent';
import { ExpressiveMonthStats, JournalStats } from '@/types/entries';
import * as S from './TotalCount.styled';

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

interface Props {
  journalStats: JournalStats;
  expressiveMonthStats: ExpressiveMonthStats;
  daysSinceSignup: number;
}

export const TotalCount = memo(
  ({ journalStats, daysSinceSignup, expressiveMonthStats }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isTouched = useSharedValue(false);

    const animatedStyle = useAnimatedStyle(() => ({
      height: withSpring(
        isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
      ),
      transform: [{ scale: withSpring(isTouched.value ? 0.9 : 1) }],
      opacity: withSpring(isTouched.value ? 0.6 : 1),
    }));

    const { totalCount, totalFrequency, totalActiveDay } = journalStats;

    return (
      <AnimatedCard
        onPressIn={() => (isTouched.value = true)}
        onPressOut={() => (isTouched.value = false)}
        onPress={() => setIsExpanded(prev => !prev)}
        style={animatedStyle}
      >
        {isExpanded ? (
          <ExpandedContent
            expressiveMonthStats={expressiveMonthStats}
            totalCount={totalCount}
            daysSinceSignup={daysSinceSignup}
            totalFrequency={totalFrequency}
            totalActiveDay={totalActiveDay}
          />
        ) : (
          <CollapsedContent journalStats={journalStats} />
        )}
      </AnimatedCard>
    );
  },
);
