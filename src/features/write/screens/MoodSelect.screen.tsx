import { useCallback, useState } from 'react';
import { MoodSelectTitle } from '@/features/write/components/MoodSelectTitle';
import { PickerMood } from '@/features/write/components/PickerMood';
import { NextButton } from '@/features/write/components/NextButton';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { MoodBar } from '@/features/write/components/MoodBar';
import { WriteHeader } from '@/features/write/components/WriteHeader';
import * as S from './MoodSelect.styled';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { SelectedMoodContainer } from '@/features/write/components/SelectedMoodContainer';
import { useRouter } from 'expo-router';

export const MoodSelectScreen = () => {
  const [mood, setMood] = useState<Mood>();
  const router = useRouter();

  const handleMoodChange = useCallback((type: MoodType, level: MoodLevel) => {
    setMood({ type, level });
  }, []);

  const handleRouteChange = useCallback(() => {
    router.push({
      pathname: '/write/journal_write',
      params: { type: mood?.type, level: mood?.level },
    });
  }, [router, mood]);

  const isSelected = !!(!!mood?.type && mood?.level);

  return (
    <S.ViewContainer edges={['bottom']} Header={<WriteHeader />}>
      <S.XStackContainer>
        <S.YStackContainer>
          <FadeIn>
            <MoodSelectTitle />
          </FadeIn>

          <FadeIn flex={1}>
            <SelectedMoodContainer
              moodType={mood?.type}
              moodLevel={mood?.level}
            />
          </FadeIn>

          <FadeIn>
            <PickerMood mood={mood} onMoodChange={handleMoodChange} />
          </FadeIn>

          <NextButton
            isSelected={isSelected}
            onRouteChange={handleRouteChange}
          />
        </S.YStackContainer>

        <MoodBar mood={mood} />
      </S.XStackContainer>
    </S.ViewContainer>
  );
};
