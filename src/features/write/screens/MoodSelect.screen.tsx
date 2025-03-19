import React from 'react';
import { useDraft } from '@/core/store/hooks/useDraft';
import { MoodSelectTitle } from '@/features/write/components/MoodSelectTitle';
import { SelectedMoodContainer } from '@/features/write/components/SelectedMoodContainer';
import { PickerMood } from '@/features/write/components/PickerMood';
import { NextButton } from '@/features/write/components/NextButton';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { MoodBar } from '@/features/write/components/MoodBar';
import { WriteHeader } from '@/features/write/components/WriteHeader';
import { CARD_DELAY } from '@/core/constants/time';
import * as S from './MoodSelect.styled';

export const MoodSelectScreen = () => {
  const { draft, onMoodChange } = useDraft();
  return (
    <S.ViewContainer edges={['bottom']} Header={<WriteHeader />}>
      <S.XStackContainer>
        <S.YStackContainer>
          <FadeIn delay={CARD_DELAY.FIRST}>
            <MoodSelectTitle />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.SECOND} flex={1}>
            <SelectedMoodContainer mood={draft.mood ?? null} />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.THIRD}>
            <PickerMood mood={draft?.mood} onMoodChange={onMoodChange} />
          </FadeIn>

          <NextButton mood={draft?.mood} />
        </S.YStackContainer>

        <MoodBar mood={draft?.mood} />
      </S.XStackContainer>
    </S.ViewContainer>
  );
};
