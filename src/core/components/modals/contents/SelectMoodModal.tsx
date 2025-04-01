import { useCallback, useState } from 'react';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { MoodSelectTitle } from '@/core/components/features/write/components/MoodSelectTitle';
import { SelectedMoodContainer } from '@/core/components/features/write/components/SelectedMoodContainer';
import { PickerMood } from '@/core/components/features/write/components/PickerMood';
import { NextButton } from '@/core/components/features/write/components/NextButton';
import * as S from '@/core/components/modals/contents/SelectMoodModal.styled';

interface Props {
  onPress: (mood: Mood) => void;
}

export const SelectMoodModal = ({ onPress }: Props) => {
  const [mood, setMood] = useState<Mood>();

  const handleMoodChange = useCallback((type: MoodType, level: MoodLevel) => {
    setMood({ type, level });
  }, []);

  const handlePress = useCallback(() => {
    if (!mood) return null;
    onPress(mood);
  }, [onPress, mood]);

  const isSelected = !!(!!mood?.type && mood?.level);

  return (
    <S.BottomSheetContainer>
      <S.YStackContainer>
        <FadeIn>
          <MoodSelectTitle />
        </FadeIn>

        <FadeIn>
          <SelectedMoodContainer
            moodType={mood?.type}
            moodLevel={mood?.level}
          />
        </FadeIn>

        <FadeIn>
          <PickerMood mood={mood} onMoodChange={handleMoodChange} />
        </FadeIn>

        <NextButton isSelected={isSelected} onPress={handlePress} />
      </S.YStackContainer>
    </S.BottomSheetContainer>
  );
};
