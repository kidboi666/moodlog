import { emotionTheme } from '@/core/constants/themes';
import React, { memo } from 'react';
import { Emotion } from '@/types/entries';
import * as S from './MoodBar.styled';

interface Props {
  emotion?: Emotion;
}

export const MoodBar = memo(({ emotion }: Props) => {
  return (
    <S.MoodBar
      moodColor={
        emotion ? emotionTheme[emotion?.type][emotion?.level] : '$gray8'
      }
    />
  );
});
