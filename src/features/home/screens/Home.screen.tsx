import { useJournal } from '@/core/store/hooks/useJournal';
import { useTranslation } from 'react-i18next';
import { useScroll } from '@/core/store/hooks/useScroll';
import { useUser } from '@/core/store/hooks/useUser';
import { useDraft } from '@/core/store/hooks/useDraft';
import { Fragment, useEffect } from 'react';
import { H3, ScrollView } from 'tamagui';
import { FadeIn } from '@/core/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/core/constants/time';
import { HomeHeader } from '@/core/components/layouts/headers/HomeHeader';
import { Container } from '@/core/components/layouts/containers/Container';
import { ShakeEmoji } from '@/core/components/ShakeEmoji';
import { WeekDay } from '@/core/components/WeekDay';
import { JournalCard } from '@/core/components/JournalCard';
import { EmptyJournal } from '@/core/components/EmptyJournal';
import * as S from './Home.styled';

export const HomeScreen = () => {
  const { dailyJournals, isSubmitted, onSubmittedChange, removeJournal } =
    useJournal('week');
  const { t } = useTranslation();
  const { onScroll } = useScroll();
  const { userInfo } = useUser();
  const { initDraft } = useDraft();
  // const isDev = __DEV__;
  const isDev = false;

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
        edges={isDev ? ['bottom'] : ['top', 'bottom']}
        Header={isDev ? <HomeHeader /> : undefined}
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
          dailyJournals.map((journal, index) => {
            const { id, content, createdAt, emotion, imageUri } = journal;
            return (
              <Fragment key={journal.id}>
                {index > 0 && <S.Separator />}
                <FadeIn delay={100 * (index + 1)}>
                  <JournalCard
                    id={id}
                    content={content}
                    emotion={emotion}
                    imageUri={imageUri}
                    createdAt={createdAt}
                    onDelete={removeJournal}
                  />
                </FadeIn>
              </Fragment>
            );
          })
        ) : (
          <EmptyJournal isToday={!!dailyJournals.length} />
        )}
      </Container>
    </ScrollView>
  );
};
