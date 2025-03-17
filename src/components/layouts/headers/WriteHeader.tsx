import React, { memo } from 'react';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import * as S from './WriteHeader.styled';

export const WriteHeader = memo(() => {
  const router = useRouter();
  return (
    <S.HeaderContainer>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
    </S.HeaderContainer>
  );
});
