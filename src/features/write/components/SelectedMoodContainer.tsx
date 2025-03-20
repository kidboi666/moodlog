import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/types/common.types';
import * as S from './SelectedMoodContainer.styled';
import { Mood } from '@/types/mood.types';

interface Props {
  mood: Nullable<Mood>;
}

export const SelectedMoodContainer = ({ mood }: Props) => {
  const [animationKey, setAnimationKey] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setAnimationKey(key => key + 1);
  }, [mood?.type, mood?.level]);

  return (
    <S.ViewContainer>
      <S.XStackContainer key={animationKey}>
        <S.MoodLevelText>
          {mood ? t(`moods.levels.${mood.level}`) : '??'}
        </S.MoodLevelText>
        <S.MoodTypeText>
          {mood ? t(`moods.types.${mood.type}`) : '??'}
        </S.MoodTypeText>
      </S.XStackContainer>
    </S.ViewContainer>
  );
};
