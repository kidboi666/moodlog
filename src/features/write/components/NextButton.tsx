import React, { memo } from 'react';
import { Link } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';

interface Props {
  moodType?: MoodType;
  moodLevel?: MoodLevel;
}

export const NextButton = memo(({ moodType, moodLevel }: Props) => {
  const isMoodSelected = !!moodType && moodLevel;
  return (
    <S.ViewContainer>
      {isMoodSelected ? (
        <Link
          href={{
            pathname: '/write/journal_write',
            params: { type: moodType, level: moodLevel },
          }}
          asChild
        >
          <S.NextButton icon={ArrowRight} />
        </Link>
      ) : (
        <S.NextButton icon={ArrowRight} disabled />
      )}
    </S.ViewContainer>
  );
});
