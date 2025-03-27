import React, { memo } from 'react';
import { ArrowLeft } from '@tamagui/lucide-icons';
import * as S from './WriteHeader.styled';
import { useRouter } from 'expo-router';

export const WriteHeader = memo(() => {
  const router = useRouter();
  return (
    <S.HeaderContainer edges={['top', 'bottom']}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
    </S.HeaderContainer>
  );
});
