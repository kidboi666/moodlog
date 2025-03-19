import { moodTheme } from '@/core/constants/themes';
import { memo, useMemo } from 'react';
import { Nullable } from '@/types/common.types';
import * as S from './Grass.styled';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';

const calculateMoodColor = (moods: Mood[]) => {
  if (!moods || moods.length === 0) return null;

  const scoreBoard = {
    angry: 0,
    peace: 0,
    sad: 0,
    happy: 0,
  };

  moods.forEach((mood: Mood) => {
    const scoreMap = {
      [MoodLevel.FULL]: 3,
      [MoodLevel.HALF]: 2,
      [MoodLevel.ZERO]: 1,
    };
    scoreBoard[mood.type] += scoreMap[mood.level] || 0;
  });

  let maxType = 'happy';
  let maxScore = -1;

  for (const [type, score] of Object.entries(scoreBoard)) {
    if (score > maxScore) {
      maxScore = score;
      maxType = type;
    }
  }

  return maxType as MoodType;
};

interface Props {
  mood: Nullable<Mood[]>;
  isEmpty?: boolean;
}

export const Grass = memo(
  ({ mood, isEmpty = false }: Props) => {
    const moodColor = useMemo(
      () => (isEmpty ? null : calculateMoodColor(mood!)),
      [mood, isEmpty],
    );

    if (isEmpty) {
      return <S.Grass />;
    }

    return (
      <S.Grass moodColor={moodColor ? moodTheme[moodColor].full : '$gray10'} />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.isEmpty !== nextProps.isEmpty) return false;
    if (!prevProps.mood && !nextProps.mood) return true;
    if (!prevProps.mood || !nextProps.mood) return false;
    return prevProps.mood.length === nextProps.mood.length;
  },
);
