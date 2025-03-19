import { Check } from '@tamagui/lucide-icons';
import { moodTheme } from '@/core/constants/themes';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './PickerMood.styled';
import { Mood, MoodLevel, MoodType } from '@/core/types/mood.types';

interface Props {
  mood?: Mood;
  onMoodChange: (mood: Mood) => void;
}

export const PickerMood = memo(({ onMoodChange, mood }: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.XStackContainer>
        {Object.values(MoodType).map((type, index) => (
          <S.MoodTypeContainer key={index}>
            <S.MoodLevelContainer>
              {Object.values(MoodLevel).map(level => (
                <S.MoodLevelButton
                  key={type + level}
                  moodColor={moodTheme[type][level]}
                  onPress={() =>
                    onMoodChange({
                      type,
                      level,
                    })
                  }
                  icon={
                    mood?.type === type && mood?.level === level ? (
                      <Check
                        position="absolute"
                        z="$1"
                        color={level === MoodLevel.ZERO ? '$gray10' : '$gray4'}
                        size="$1"
                      />
                    ) : null
                  }
                />
              ))}
            </S.MoodLevelContainer>
            <S.SelectedMoodBox key={index}>
              <S.SelectedMoodText>
                {t(`emotions.types.${type}`)}
              </S.SelectedMoodText>
            </S.SelectedMoodBox>
          </S.MoodTypeContainer>
        ))}
      </S.XStackContainer>
    </S.ViewContainer>
  );
});
