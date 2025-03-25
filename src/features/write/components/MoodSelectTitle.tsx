import { View, XStack } from 'tamagui';
import { ShakeEmoji } from '@/core/components/ShakeEmoji';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './MoodSelectTitle.styled';

export const MoodSelectTitle = memo(() => {
  const { t } = useTranslation();
  return (
    <View>
      <XStack>
        <ShakeEmoji emoji="🫥" duration={3000} />
      </XStack>
      <S.Title>{t('placeholders.mood')}</S.Title>
    </View>
  );
});
