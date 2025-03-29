import { CollapsedContent } from '@/features/statistics/components/mood-average/CollapsedContent';
import { ExpandedContent } from '@/features/statistics/components/mood-average/ExpandedContent';
import * as S from './MoodAverage.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { ExpansionState, TimeRange } from '@/types/statistic.types';
import { moodTheme } from '@/core/constants/themes';
import { useMoodStats } from '@/features/statistics/hooks/useMoodStats';
import { ISOMonthString } from '@/types/date.types';
import Animated from 'react-native-reanimated';
import { useHeightAnimation } from '@/features/statistics/hooks/useHeightAnimation';

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer);

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
  const { expansionState, onPress, animatedStyle } = useHeightAnimation();
  const {
    moodStats: { signatureMood, scoreBoard },
  } = stats || {};
  const hasSignatureMood = signatureMood ? signatureMood?.count > 0 : false;
  const bgColor =
    expansionState === ExpansionState.EXPANDED
      ? '$gray4'
      : hasSignatureMood
        ? moodTheme[signatureMood?.type as MoodType][MoodLevel.FULL]
        : '$gray4';

  return (
    <AnimatedCardContainer
      moodColor={bgColor}
      onPress={onPress}
      style={animatedStyle}
    >
      {expansionState === ExpansionState.EXPANDED ? (
        <ExpandedContent scoreBoard={scoreBoard} />
      ) : (
        <CollapsedContent
          hasSignatureMood={hasSignatureMood}
          signatureMood={signatureMood}
        />
      )}
    </AnimatedCardContainer>
  );
};
