import * as S from '@/features/write/components/PickerMood.styled';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { MoodLevelButton } from '@/features/write/components/MoodLevelButton';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { moodTheme } from '@/core/constants/themes';

interface Props {
  type: MoodType;
  mood?: Mood;
  onMoodChange: (type: MoodType, level: MoodLevel) => void;
}

export const MoodTypeBox = memo(({ type, mood, onMoodChange }: Props) => {
  const { t } = useTranslation();
  return (
    <S.MoodTypeContainer key={type}>
      <S.MoodLevelContainer>
        {Object.values(MoodLevel).map(level => (
          <MoodLevelButton
            key={`${type}-${level}`}
            type={type}
            level={level}
            moodColor={moodTheme[type][level]}
            isSelected={type === mood?.type && level === mood?.level}
            onMoodChange={onMoodChange}
          />
        ))}
      </S.MoodLevelContainer>
      <S.SelectedMoodBox key={type}>
        <S.SelectedMoodText>{t(`moods.types.${type}`)}</S.SelectedMoodText>
      </S.SelectedMoodBox>
    </S.MoodTypeContainer>
  );
});
