import { useState } from 'react';
import { ExpandedContent } from '@/features/statistics/components/selected-month/ExpandedContent';
import { CollapsedContent } from '@/features/statistics/components/selected-month/CollapsedContent';
import { EmptyContent } from '@/features/statistics/components/EmptyContent';
import * as S from './CurrentMonth.styled';
import { useStatistics } from '@/core/store/contexts/statistics.context';

export const CurrentMonth = () => {
  const { selectedMonthStats } = useStatistics();
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = () => {
    if (selectedMonthStats) {
      setIsExpanded(prev => !prev);
      return;
    }
    return undefined;
  };

  return (
    <S.CardContainer onPress={onPress}>
      {!selectedMonthStats || selectedMonthStats.count === 0 ? (
        <EmptyContent />
      ) : isExpanded ? (
        <ExpandedContent selectedMonthStats={selectedMonthStats} />
      ) : (
        <CollapsedContent selectedMonthStats={selectedMonthStats} />
      )}
    </S.CardContainer>
  );
};
