import React, { memo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';

interface Props {
  moodType?: MoodType;
  moodLevel?: MoodLevel;
}

export const NextButton = memo(({ moodType, moodLevel }: Props) => {
  const router = useRouter();
  const isMoodSelected = !!moodType && moodLevel;

  const handleRouteChange = useCallback(() => {
    router.push({
      pathname: '/write/journal_write',
      params: { type: moodType, level: moodLevel },
    });
  }, [router, moodType, moodLevel]);

  return (
    <S.AnimatedContainer>
      <S.NextButton
        icon={ArrowRight}
        disabled={!isMoodSelected}
        onPress={handleRouteChange}
      />
    </S.AnimatedContainer>
  );
});
