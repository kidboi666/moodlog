import React, { memo } from 'react';
import { useRouter } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';
import { AnimatePresence } from 'tamagui';
import { Mood } from '@/types/mood.types';

interface Props {
  mood?: Mood;
}

export const NextButton = memo(({ mood }: Props) => {
  const router = useRouter();
  return (
    <S.ViewContainer>
      <AnimatePresence>
        {mood && (
          <S.NextButton
            disabled={!mood}
            onPress={() => router.push('/(tabs)/write/journal_write')}
            icon={ArrowRight}
          />
        )}
      </AnimatePresence>
    </S.ViewContainer>
  );
});
