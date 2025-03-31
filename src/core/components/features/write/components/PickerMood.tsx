import React from 'react';
import * as S from './PickerMood.styled';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { MoodTypeBox } from '@/core/components/features/write/components/MoodTypeBox';
import { View } from 'tamagui';

interface Props {
  mood?: Mood;
  onMoodChange: (type: MoodType, level: MoodLevel) => void;
}

export const PickerMood = ({ onMoodChange, mood }: Props) => {
  return (
    <View>
      <S.XStackContainer>
        {Object.values(MoodType).map(type => (
          <MoodTypeBox
            key={type}
            type={type}
            mood={mood}
            onMoodChange={onMoodChange}
          />
        ))}
      </S.XStackContainer>
    </View>
  );
};
