import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/core/types/common.types';
import * as S from './SelectedMoodContainer.styled';
import { Mood } from '@/core/types/mood.types';

interface Props {
  mood: Nullable<Mood>;
}

export const SelectedMoodContainer = memo(({ mood }: Props) => {
  const [animationKey, setAnimationKey] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setAnimationKey(key => key + 1);
  }, [mood?.type, mood?.level]);

  return (
    <S.ViewContainer>
      <S.XStackContainer key={animationKey}>
        <S.MoodLevelText>
          {mood ? t(`emotions.levels.${mood.level}`) : '??'}
        </S.MoodLevelText>
        <S.MoodTypeText>
          {mood ? t(`emotions.types.${mood.type}`) : '??'}
        </S.MoodTypeText>
      </S.XStackContainer>
    </S.ViewContainer>
  );
});
