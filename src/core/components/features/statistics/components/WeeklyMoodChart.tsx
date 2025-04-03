import React, { useEffect, useState } from 'react';
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
import { ISOMonthString } from '@/types/date.types';
import { useWeeklyMoodStats } from '@/core/components/features/statistics/hooks/useWeeklyMoodStats';
import { getISODateFromMonthString } from '@/utils/date';
import { ChartItem } from '@/core/components/features/statistics/components/ChartItem';
import { MoodType } from '@/types/mood.types';
import { H3, Text, YStack } from 'tamagui';
import { StatisticsService } from '@/core/services/statistics.service';

const AnimatedBox = Animated.createAnimatedComponent(S.AnimatedBox);
const AnimatedText = Animated.createAnimatedComponent(S.AnimatedText);

interface Props {
  selectedMonth: ISOMonthString;
}

export const WeeklyMoodChart = ({ selectedMonth }: Props) => {
  const now = new Date();
  const date = now.getDate();
  const dateString = getISODateFromMonthString(selectedMonth, date);
  const { t } = useTranslation();
  const { stats } = useWeeklyMoodStats(dateString);
  const [isMount, setIsMount] = useState(false);
  const [percentages, setPercentages] = useState<
    Record<string, Record<string, number>>
  >({});

  const days = Array(7)
    .fill(0)
    .map(() => useSharedValue(0));

  const animatedStyles = days.map(day =>
    useAnimatedStyle(() => ({
      opacity: day.value,
      transform: [{ translateY: (1 - day.value) * 20 }],
    })),
  );

  useEffect(() => {
    days.forEach((day, index) => {
      day.value = withDelay(
        index * 100,
        withTiming(1, {
          duration: 800,
          easing: Easing.inOut(Easing.quad),
        }),
      );
    });
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (!stats) return;

    const newPercentages: Record<string, Record<string, number>> = {};

    Object.keys(WEEK_DAY).forEach(day => {
      const scoreBoard = stats[day];
      if (!scoreBoard) return;

      const counts = Object.values(scoreBoard).map(item => item.count);
      const countPercentages = StatisticsService.convertToPercentages(counts);

      newPercentages[day] = {};
      Object.keys(scoreBoard).forEach((type, index) => {
        newPercentages[day][type] = countPercentages[index];
      });
    });

    setPercentages(newPercentages);
  }, [stats]);

  return (
    <S.YStackContainer>
      <H3>{t('statistics.weeklyMood.title')}</H3>
      <Text>{t('statistics.weeklyMood.description')}</Text>

      <YStack>
        {Object.keys(WEEK_DAY).map((day, index) => {
          const scoreBoard = stats[day];
          if (!scoreBoard) return null;
          const signatureMood = Object.entries(scoreBoard).filter(
            ([type, { count }]) => count !== 0,
          );
          // TODO
          return (
            <AnimatedBox key={index} style={animatedStyles[index]}>
              <AnimatedText>{t(`calendar.daysShort.${day}`)}</AnimatedText>
              <S.ChartBox>
                {Object.entries(scoreBoard).map(([type, { count }]) => (
                  <ChartItem
                    key={type}
                    type={type as MoodType}
                    count={count}
                    isMount={isMount}
                    percentage={percentages[day]?.[type] || 0}
                  />
                ))}
              </S.ChartBox>
            </AnimatedBox>
          );
        })}
      </YStack>
    </S.YStackContainer>
  );
};
