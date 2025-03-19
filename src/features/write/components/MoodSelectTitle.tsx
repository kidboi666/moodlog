import { XStack } from 'tamagui';
import { ShakeEmoji } from '@/core/components/ShakeEmoji';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './MoodSelectTitle.styled';

export const MoodSelectTitle = () => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <XStack>
        <ShakeEmoji emoji="🫥" duration={3000} />
      </XStack>
      <S.Title>{t('placeholders.emotion')}</S.Title>
    </S.ViewContainer>
  );
};
