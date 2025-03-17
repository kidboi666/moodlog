import { H3, ScrollView } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/layouts/containers/Container';
import { EmptyJournal } from '@/components/EmptyJournal';
import { FadeIn } from '@/components/FadeIn';
import { ShakeEmoji } from '@/components/ShakeEmoji';
import { WeekDay } from '@/components/WeekDay';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/store/hooks/useUser';
import { useScroll } from '@/store/hooks/useScroll';
import { HomeHeader } from '@/components/layouts/headers/HomeHeader';
import { PARAGRAPH_DELAY } from '@/constants/time';
import { useDraft } from '@/store/hooks/useDraft';
import * as S from '@/styles/Main.styled';

export default function HomeScreen() {
  const { dailyJournals, isSubmitted, onSubmittedChange } = useJournal('week');
  const { t } = useTranslation();
  const { onScroll } = useScroll();
  const { userInfo } = useUser();
  const { initDraft } = useDraft();

  useEffect(() => {
    if (isSubmitted) {
      initDraft();
      onSubmittedChange();
    }
  }, [isSubmitted, initDraft, onSubmittedChange]);

  return (
    <ScrollView
      onScroll={onScroll}
      scrollEventThrottle={32}
      overScrollMode="always"
      keyboardShouldPersistTaps="handled"
    >
      <Container
        edges={__DEV__ ? ['bottom'] : ['top', 'bottom']}
        Header={__DEV__ ? <HomeHeader /> : undefined}
        padded
      >
        <S.ContentHeaderContainer>
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <S.WelcomeEmojiBox>
              <S.WelcomeTitleText>
                {t('common.greeting.hello')}
              </S.WelcomeTitleText>
              <ShakeEmoji emoji="👋" />
            </S.WelcomeEmojiBox>
            <H3>
              {t('common.greeting.welcome', { name: userInfo?.userName })}
            </H3>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <S.HowAreYouText>{t('common.greeting.howAreYou')}</S.HowAreYouText>
          </FadeIn>
          <WeekDay />
        </S.ContentHeaderContainer>

        {Array.isArray(dailyJournals) ? (
          dailyJournals.map((journal, index) => (
            <Fragment key={journal.id}>
              {index > 0 && <S.Separator />}
              <FadeIn delay={100 * (index + 1)}>
                <JournalCard journal={journal} />
              </FadeIn>
            </Fragment>
          ))
        ) : (
          <EmptyJournal isToday={!!dailyJournals.length} />
        )}
      </Container>
    </ScrollView>
  );
}
