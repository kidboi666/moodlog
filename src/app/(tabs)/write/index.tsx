import { useCallback, useState } from 'react';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { useRouter } from 'expo-router';
import * as S from '@/styles/screens/write/MoodSelect.styled';
import { WriteHeader } from '@/core/components/features/write/components/WriteHeader';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { MoodSelectTitle } from '@/core/components/features/write/components/MoodSelectTitle';
import { SelectedMoodContainer } from '@/core/components/features/write/components/SelectedMoodContainer';
import { PickerMood } from '@/core/components/features/write/components/PickerMood';
import { NextButton } from '@/core/components/features/write/components/NextButton';
import { MoodBar } from '@/core/components/features/write/components/MoodBar';

export default function Screen() {
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
}
