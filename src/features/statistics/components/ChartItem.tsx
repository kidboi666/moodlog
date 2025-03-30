import * as S from '@/features/statistics/components/MoodChart.styled';
import React, { useEffect } from 'react';
import { moodTheme } from '@/core/constants/themes';
import { MoodLevel, MoodType } from '@/types/mood.types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedChartItem = Animated.createAnimatedComponent(S.ChartItem);

interface Props {
  type: MoodType;
  count: number;
  score: number;
  isMount: boolean;
}

export const ChartItem = ({ type, count, score, isMount }: Props) => {
  const moodColor = count !== 0 ? moodTheme[type][MoodLevel.FULL] : '$color6';
  const widthValue = useSharedValue(20);

  const animatedStyles = useAnimatedStyle(() => ({
    width: widthValue.value,
  }));

  useEffect(() => {
    if (isMount) {
      setTimeout(() => {
        widthValue.value = withTiming(score * 20 || 20, {
          duration: 1000,
        });
      }, 1000);
    }
  }, [isMount]);

  return (
    <S.ChartItemContainer>
      <AnimatedChartItem style={animatedStyles} moodColor={moodColor} />
    </S.ChartItemContainer>
  );
};
