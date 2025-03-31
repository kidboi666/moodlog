import * as S from '@/core/components/features/statistics/components/MoodChart.styled';
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
  isMount: boolean;
  percentage?: number;
}

export const ChartItem = ({ type, count, isMount, percentage = 0 }: Props) => {
  const moodColor = count !== 0 ? moodTheme[type][MoodLevel.FULL] : '$color6';
  const widthValue = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    width: widthValue.value,
  }));

  useEffect(() => {
    if (isMount && percentage > 0) {
      setTimeout(() => {
        // 백분율에 따라 너비 설정 (백분율이 0이면 표시하지 않음)
        widthValue.value = withTiming(percentage, {
          duration: 1000,
        });
      }, 1000);
    }
  }, [isMount, percentage]);

  // 백분율이 0인 경우 빈 컨테이너만 반환 (레이아웃 유지)
  if (percentage === 0) {
    return <S.ChartItemContainer />;
  }

  return (
    <S.ChartItemContainer>
      <AnimatedChartItem style={animatedStyles} moodColor={moodColor} />
      <S.PercentageText>{`${percentage}%`}</S.PercentageText>
    </S.ChartItemContainer>
  );
};
