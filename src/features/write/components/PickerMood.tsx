import { EmotionLevel, EmotionType } from '@/types/enums';
import { Check } from '@tamagui/lucide-icons';
import { emotionTheme } from '@/core/constants/themes';
import React, { memo } from 'react';
import { Emotion } from '@/types/entries';
import { useTranslation } from 'react-i18next';
import * as S from './PickerMood.styled';

interface Props {
  emotion?: Emotion;
  onEmotionChange: (emotion: Emotion) => void;
}

export const PickerMood = memo(({ onEmotionChange, emotion }: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.XStackContainer>
        {Object.values(EmotionType).map((type, index) => (
          <S.MoodTypeContainer key={index}>
            <S.MoodLevelContainer>
              {Object.values(EmotionLevel).map(level => (
                <S.MoodLevelButton
                  key={type + level}
                  moodColor={emotionTheme[type][level]}
                  onPress={() =>
                    onEmotionChange({
                      type,
                      level,
                    })
                  }
                  icon={
                    emotion?.type === type && emotion?.level === level ? (
                      <Check
                        position="absolute"
                        z="$1"
                        color={
                          level === EmotionLevel.ZERO ? '$gray10' : '$gray4'
                        }
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
