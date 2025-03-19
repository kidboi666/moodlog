import React, { memo, useEffect, useState } from 'react';
import { Emotion } from '@/types/entries';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/types/utils';
import * as S from './SelectedMoodContainer.styled';

interface Props {
  emotion: Nullable<Emotion>;
}

export const SelectedMoodContainer = memo(({ emotion }: Props) => {
  const [animationKey, setAnimationKey] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setAnimationKey(key => key + 1);
  }, [emotion?.type, emotion?.level]);

  return (
    <S.ViewContainer>
      <S.XStackContainer key={animationKey}>
        <S.MoodLevelText>
          {emotion ? t(`emotions.levels.${emotion.level}`) : '??'}
        </S.MoodLevelText>
        <S.MoodTypeText>
          {emotion ? t(`emotions.types.${emotion.type}`) : '??'}
        </S.MoodTypeText>
      </S.XStackContainer>
    </S.ViewContainer>
  );
});
