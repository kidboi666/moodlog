import { Emotion } from '@/types/entries';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { emotionTheme } from '@/constants/themes';
import { memo, useMemo } from 'react';
import { Nullable } from '@/types/utils';
import * as S from './Grass.styled';

const calculateEmotionColor = (emotions: Emotion[]) => {
  if (!emotions || emotions.length === 0) return null;

  const scoreBoard = {
    angry: 0,
    peace: 0,
    sad: 0,
    happy: 0,
  };

  emotions.forEach((emotion: Emotion) => {
    const scoreMap = {
      [EmotionLevel.FULL]: 3,
      [EmotionLevel.HALF]: 2,
      [EmotionLevel.ZERO]: 1,
    };
    scoreBoard[emotion.type] += scoreMap[emotion.level] || 0;
  });

  let maxType = 'happy';
  let maxScore = -1;

  for (const [type, score] of Object.entries(scoreBoard)) {
    if (score > maxScore) {
      maxScore = score;
      maxType = type;
    }
  }

  return maxType as EmotionType;
};

interface Props {
  emotions: Nullable<Emotion[]>;
  isEmpty?: boolean;
}

export const Grass = memo(
  ({ emotions, isEmpty = false }: Props) => {
    const emotionColor = useMemo(
      () => (isEmpty ? null : calculateEmotionColor(emotions!)),
      [emotions, isEmpty],
    );

    if (isEmpty) {
      return <S.Grass />;
    }

    return (
      <S.Grass
        moodColor={emotionColor ? emotionTheme[emotionColor].full : '$gray10'}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.isEmpty !== nextProps.isEmpty) return false;
    if (!prevProps.emotions && !nextProps.emotions) return true;
    if (!prevProps.emotions || !nextProps.emotions) return false;
    return prevProps.emotions.length === nextProps.emotions.length;
  },
);
