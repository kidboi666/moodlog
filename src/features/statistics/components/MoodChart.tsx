import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { WEEK_DAY } from '@/core/constants/date';
import { useTranslation } from 'react-i18next';
import * as S from './MoodChart.styled';
import { TimeRange } from '@/types/statistic.types';
import { ISOMonthString } from '@/types/date.types';
import { useMoodStats } from '@/features/statistics/hooks/useMoodStats';

const AnimatedBox = Animated.createAnimatedComponent(S.AnimatedBox);
const AnimatedText = Animated.createAnimatedComponent(S.AnimatedText);

const ChartItem = () => {
  return (
    <S.ChartItemContainer>
      <S.ChartItem />
    </S.ChartItemContainer>
  );
};
interface Props {
  timeRange: TimeRange;
  selectedYear: number;
  selectedMonth: ISOMonthString;
}

export const MoodChart = ({
  timeRange,
  selectedYear,
  selectedMonth,
}: Props) => {
  const { t } = useTranslation();
  const { stats } = useMoodStats(timeRange, selectedYear, selectedMonth);
  const days = Array(7)
    .fill(0)
    .map(() => useSharedValue(0));

  useEffect(() => {
    days.forEach((day, index) => {
      day.value = withDelay(
        index * 100,
        withTiming(1, {
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      );
    });
  }, []);

  const animatedStyles = days.map(day =>
    useAnimatedStyle(() => ({
      opacity: day.value,
      transform: [{ scale: day.value }, { translateY: (1 - day.value) * 20 }],
    })),
  );

  return (
    <S.YStackContainer>
      {Object.keys(WEEK_DAY).map((mood, index) => (
        <AnimatedBox key={index} style={animatedStyles[index]}>
          <AnimatedText>{t(`calendar.daysShort.${mood}`)}</AnimatedText>
          <ChartItem />
        </AnimatedBox>
      ))}
    </S.YStackContainer>
  );
};
