import { CollapsedContent } from '@/features/statistics/components/mood-average/CollapsedContent';
import { ExpandedContent } from '@/features/statistics/components/mood-average/ExpandedContent';
import * as S from './MoodAverage.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { useControllableState, useEvent } from 'tamagui';
import { ExpansionState, TimeRange } from '@/types/statistic.types';
import { moodTheme } from '@/core/constants/themes';
import { useMoodStats } from '@/features/statistics/hooks/useMoodStats';
import { ISOMonthString } from '@/types/date.types';

interface Props {
  timeRange: TimeRange;
  selectedYear: number;
  selectedMonth: ISOMonthString;
}

export const MoodAverage = ({
  timeRange,
  selectedYear,
  selectedMonth,
}: Props) => {
  const { stats } = useMoodStats(timeRange, selectedYear, selectedMonth);
  const [expansionState, setExpansionState] =
    useControllableState<ExpansionState>({
      strategy: 'most-recent-wins',
      defaultProp: ExpansionState.COLLAPSED,
    });
  const isExpanded = expansionState === ExpansionState.EXPANDED;

  const handleIsExpandedChange = useEvent(() => {
    setExpansionState(prev =>
      prev === ExpansionState.EXPANDED
        ? ExpansionState.COLLAPSED
        : ExpansionState.EXPANDED,
    );
  });

  const {
    moodStats: { signatureMood, scoreBoard },
  } = stats || {};
  const hasSignatureMood = signatureMood ? signatureMood?.count > 0 : false;
  const bgColor = isExpanded
    ? '$gray4'
    : hasSignatureMood
      ? moodTheme[signatureMood?.type as MoodType][MoodLevel.FULL]
      : '$gray4';

  return (
    <S.CardContainer moodColor={bgColor} onPress={handleIsExpandedChange}>
      <S.AnimatedContent expanded={isExpanded}>
        {isExpanded ? (
          <ExpandedContent scoreBoard={scoreBoard} />
        ) : (
          <CollapsedContent
            hasSignatureMood={hasSignatureMood}
            signatureMood={signatureMood}
          />
        )}
      </S.AnimatedContent>
    </S.CardContainer>
  );
};
