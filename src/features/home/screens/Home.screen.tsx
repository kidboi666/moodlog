import { useTranslation } from 'react-i18next';
import React, { Fragment, useCallback, useEffect } from 'react';
import { H3, ScrollView } from 'tamagui';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { PARAGRAPH_DELAY } from '@/core/constants/time';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { Container } from '@/core/components/Container.styleable';
import { ShakeEmoji } from '@/core/components/ShakeEmoji';
import { WeekDay } from '@/features/home/components/WeekDay';
import { JournalCard } from '@/features/journal/components/JournalCard';
import { EmptyJournal } from '@/features/journal/components/EmptyJournal';
import * as S from './Home.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useUser } from '@/core/store/contexts/user.context';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useFocusEffect } from 'expo-router';
import { useDraft } from '@/core/store/contexts/draft.context';

export const HomeScreen = () => {
  const { selectedJournals, removeJournal, selectJournals } = useJournal();
  const { isToday, selectedDate } = useCalendar();
  const { initDraft } = useDraft();
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const isDev = __DEV__;

  useFocusEffect(
    useCallback(() => {
      selectJournals(selectedDate);
    }, [selectedDate, selectJournals]),
  );

  useEffect(() => {
    setTimeout(() => {
      initDraft();
    }, 0);
  }, []);

  return (
    <ScrollView overScrollMode="always">
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

        {Array.isArray(selectedJournals) ? (
          selectedJournals.map((journal, index) => {
            const { id, content, createdAt, mood, imageUri } = journal;
            return (
              <Fragment key={journal.id}>
                {index > 0 && <S.Separator />}
                <FadeIn delay={100 * (index + 1)}>
                  <JournalCard
                    id={id}
                    content={content}
                    mood={mood}
                    imageUri={imageUri}
                    createdAt={createdAt}
                    onDelete={removeJournal}
                  />
                </FadeIn>
              </Fragment>
            );
          })
        ) : (
          <EmptyJournal isToday={isToday(selectedJournals)} />
        )}
      </Container>
    </ScrollView>
  );
};
