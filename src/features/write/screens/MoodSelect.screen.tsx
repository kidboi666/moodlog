import React from 'react';
import { MoodSelectTitle } from '@/features/write/components/MoodSelectTitle';
import { SelectedMoodContainer } from '@/features/write/components/SelectedMoodContainer';
import { PickerMood } from '@/features/write/components/PickerMood';
import { NextButton } from '@/features/write/components/NextButton';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { MoodBar } from '@/features/write/components/MoodBar';
import { WriteHeader } from '@/features/write/components/WriteHeader';
import { CARD_DELAY } from '@/core/constants/time';
import * as S from './MoodSelect.styled';
import { useDraft } from '@/core/store/contexts/draft.context';

export const MoodSelectScreen = () => {
  const { mood, onMoodChange } = useDraft();
  return (
    <S.ViewContainer edges={['bottom']} Header={<WriteHeader />}>
      <S.XStackContainer>
        <S.YStackContainer>
          <FadeIn delay={CARD_DELAY.FIRST}>
            <MoodSelectTitle />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.SECOND} flex={1}>
            <SelectedMoodContainer mood={mood ?? null} />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.THIRD}>
            <PickerMood mood={mood} onMoodChange={onMoodChange} />
          </FadeIn>

          <NextButton mood={mood} />
        </S.YStackContainer>

        <MoodBar mood={mood} />
      </S.XStackContainer>
    </S.ViewContainer>
  );
};
