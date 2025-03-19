import { ExpandedContent } from '@/features/statistics/components/total-count/ExpandedContent';
import { CollapsedContent } from '@/features/statistics/components/total-count/CollapsedContent';
import * as S from './TotalCount.styled';

import {
  ExpansionState,
  ExpressiveMonthStats,
  JournalStats,
} from '@/types/statistic.types';
import { useControllableState, useEvent } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';

interface Props {
  journalStats: JournalStats;
  expressiveMonthStats: ExpressiveMonthStats;
  daysSinceSignup: number;
}

const heights = {
  expanded: {
    height: RECORD_CARD_EXPANDED_HEIGHT,
  },
  collapsed: {
    height: RECORD_CARD_HEIGHT,
  },
} as const;

export const TotalCount = ({
  journalStats,
  daysSinceSignup,
  expressiveMonthStats,
}: Props) => {
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

  const { totalCount, totalFrequency, totalActiveDay } = journalStats;

  return (
    <S.CardContainer onPress={handleIsExpandedChange} {...animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
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
    </S.CardContainer>
  );
};
