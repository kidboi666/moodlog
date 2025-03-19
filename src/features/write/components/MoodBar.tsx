import { moodTheme } from '@/core/constants/themes';
import React, { memo } from 'react';
import * as S from './MoodBar.styled';
import { Mood } from '@/types/mood.types';

interface Props {
  mood?: Mood;
}

export const MoodBar = memo(({ mood }: Props) => {
  return (
    <S.MoodBar
      moodColor={mood ? moodTheme[mood?.type][mood?.level] : '$gray8'}
    />
  );
});
