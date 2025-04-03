import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import * as S from '@/styles/screens/home/Home.styled';
import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji';
import { H3 } from 'tamagui';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  userName?: string;
}

export const WelcomeZone = memo(({ userName }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
        <S.WelcomeEmojiBox>
          <S.WelcomeTitleText>{t('common.greeting.hello')}</S.WelcomeTitleText>
          <ShakeEmoji emoji="👋" />
        </S.WelcomeEmojiBox>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </FadeIn>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
        <S.HowAreYouText>{t('common.greeting.howAreYou')}</S.HowAreYouText>
      </FadeIn>
    </>
  );
});
