import { ExpandedContent } from '@/features/statistics/components/total-count/ExpandedContent';
import { CollapsedContent } from '@/features/statistics/components/total-count/CollapsedContent';
import * as S from './TotalCount.styled';

import { ExpansionState, TimeRange } from '@/types/statistic.types';
import { useUser } from '@/core/store/contexts/user.context';
import { useJournalStats } from '@/features/statistics/hooks/useJournalStats';
import { ISOMonthString } from '@/types/date.types';
import Animated from 'react-native-reanimated';
import { useHeightAnimation } from '@/features/statistics/hooks/useHeightAnimation';

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer);

interface Props {
  timeRange: TimeRange;
  selectedYear: number;
  selectedMonth: ISOMonthString;
}

export const TotalCount = ({
  timeRange,
  selectedYear,
  selectedMonth,
}: Props) => {
  const { stats } = useJournalStats(timeRange, selectedYear, selectedMonth);
  const { userInfo } = useUser();
  const { daysSinceSignup } = userInfo ?? null;
  const { animatedStyle, expansionState, onPress } = useHeightAnimation();
  const { expressiveMonth, totalCount, frequency, activeDay } = stats || {};

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
        <ExpandedContent
          expressiveMonth={expressiveMonth}
          totalCount={totalCount}
          daysSinceSignup={daysSinceSignup}
          frequency={frequency}
          activeDay={activeDay}
        />
      ) : (
        <CollapsedContent totalCount={totalCount} />
      )}
    </AnimatedCardContainer>
  );
};
