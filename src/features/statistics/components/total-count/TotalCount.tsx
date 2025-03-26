import { ExpandedContent } from '@/features/statistics/components/total-count/ExpandedContent';
import { CollapsedContent } from '@/features/statistics/components/total-count/CollapsedContent';
import * as S from './TotalCount.styled';

import { ExpansionState, TimeRange } from '@/types/statistic.types';
import { useControllableState, useEvent } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';
import { useUser } from '@/core/store/contexts/user.context';
import { useJournalStats } from '@/features/statistics/hooks/useJournalStats';
import { ISOMonthString } from '@/types/date.types';

const heights = {
  expanded: {
    height: RECORD_CARD_EXPANDED_HEIGHT,
  },
  collapsed: {
    height: RECORD_CARD_HEIGHT,
  },
} as const;

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
  const [expansionState, setExpansionState] =
    useControllableState<ExpansionState>({
      strategy: 'most-recent-wins',
      defaultProp: ExpansionState.COLLAPSED,
    });
  const animatedStyle = heights[expansionState];

  const handleIsExpandedChange = useEvent(() => {
    setExpansionState(prev =>
      prev === ExpansionState.EXPANDED
        ? ExpansionState.COLLAPSED
        : ExpansionState.EXPANDED,
    );
  });

  const { expressiveMonth, totalCount, frequency, activeDay } = stats || {};

  return (
    <S.CardContainer onPress={handleIsExpandedChange} {...animatedStyle}>
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
    </S.CardContainer>
  );
};
