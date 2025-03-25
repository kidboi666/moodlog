import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './SelectedMoodContainer.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';

interface Props {
  moodType?: MoodType;
  moodLevel?: MoodLevel;
}

export const SelectedMoodContainer = memo(({ moodType, moodLevel }: Props) => {
  const { t } = useTranslation();

  return (
    <S.ViewContainer>
      <S.XStackContainer>
        <S.MoodLevelText>
          {moodType ? t(`moods.levels.${moodLevel}`) : '??'}
        </S.MoodLevelText>
        <S.MoodTypeText>
          {moodType ? t(`moods.types.${moodType}`) : '??'}
        </S.MoodTypeText>
      </S.XStackContainer>
    </S.ViewContainer>
  );
});
