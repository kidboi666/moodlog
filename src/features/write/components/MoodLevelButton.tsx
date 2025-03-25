import { Check } from '@tamagui/lucide-icons';
import { MoodLevel, MoodType } from '@/types/mood.types';
import * as S from '@/features/write/components/PickerMood.styled';
import React, { memo, useCallback } from 'react';

interface Props {
  type: MoodType;
  level: MoodLevel;
  isSelected: boolean;
  moodColor: string;
  onMoodChange: (type: MoodType, level: MoodLevel) => void;
}

export const MoodLevelButton = memo(
  ({ type, level, isSelected, onMoodChange, moodColor }: Props) => {
    const handlePress = useCallback(() => {
      onMoodChange(type, level);
    }, []);
    return (
      <S.MoodLevelButton
        key={type + level}
        moodColor={moodColor}
        onPress={handlePress}
        icon={
          isSelected ? (
            <Check
              position="absolute"
              z="$1"
              color={level === MoodLevel.ZERO ? '$gray10' : '$gray4'}
              size="$1"
            />
          ) : null
        }
      />
    );
  },
);
