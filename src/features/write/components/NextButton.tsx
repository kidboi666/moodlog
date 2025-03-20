import React from 'react';
import { useRouter } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';
import { Mood } from '@/types/mood.types';

interface Props {
  mood?: Mood;
}

export const NextButton = ({ mood }: Props) => {
  const router = useRouter();
  return (
    <S.ViewContainer>
      <S.NextButton
        disabled={!mood}
        onPress={() => router.push('/write/journal_write')}
        icon={ArrowRight}
      />
    </S.ViewContainer>
  );
};
