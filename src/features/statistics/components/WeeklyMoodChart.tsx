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
import { useWeeklyMoodStats } from '@/features/statistics/hooks/useWeeklyMoodStats';
import { getISODateFromMonthString } from '@/utils/date';
import { ChartItem } from '@/features/statistics/components/ChartItem';
import { StatisticsService } from '@/core/services/statistics.service';
import { MoodType } from '@/types/mood.types';
import { H3, Text, XStack, YStack } from 'tamagui';

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

  return (
    <S.YStackContainer>
      <H3>주간 감정 분포</H3>
      <Text>주 단위로 가장 많이 선택한 감정 분포표</Text>
      <YStack>
        {Object.keys(WEEK_DAY).map((day, index) => {
          const scoreBoard = stats[day];
          const signatureMood = StatisticsService.getSignatureMood(scoreBoard);

          const { type, count, score } = signatureMood;

          return (
            <AnimatedBox key={index} style={animatedStyles[index]}>
              <AnimatedText>{t(`calendar.daysShort.${day}`)}</AnimatedText>
              <XStack>
                {Object.entries(scoreBoard).map(([type, { count, score }]) => (
                  <ChartItem
                    key={type}
                    type={type as MoodType}
                    count={count}
                    score={score}
                    isMount={isMount}
                  />
                ))}
              </XStack>
            </AnimatedBox>
          );
        })}
      </YStack>
    </S.YStackContainer>
  );
};
