import { useTranslation } from 'react-i18next';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { H3, ScrollView } from 'tamagui';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import {
  ANIMATION_DELAY_MS,
  ANIMATION_DELAY_SECONDS,
} from '@/core/constants/time';
import { Container } from '@/core/components/Container.styleable';
import { ShakeEmoji } from '@/core/components/ShakeEmoji';
import { JournalCard } from '@/features/journal/components/JournalCard';
import { EmptyJournal } from '@/features/journal/components/EmptyJournal';
import * as S from './Home.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useUser } from '@/core/store/contexts/user.context';
import { useCalendar } from '@/core/hooks/useCalendar';
import { WeekDay } from '@/features/home/components/WeekDay';
import { BottomSheet } from '@/core/components/modals/BottomSheet';
import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';

export const HomeScreen = () => {
  const { selectedJournals, selectJournals } = useJournal();
  const [journalToDeleteId, setJournalToDeleteId] = useState('');
  const { isToday, selectedDate } = useCalendar();
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const [open, setOpen] = useState(false);

  const handleDeletePress = useCallback((id: string) => {
    setJournalToDeleteId(id);
    setOpen(true);
  }, []);

  useEffect(() => {
    selectJournals(selectedDate);
  }, []);

  return (
    <>
      <ScrollView overScrollMode="always">
        <Container edges={['top', 'bottom']} padded>
          <S.ContentHeaderContainer>
            <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
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
            <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
              <S.HowAreYouText>
                {t('common.greeting.howAreYou')}
              </S.HowAreYouText>
            </FadeIn>
            <WeekDay />
          </S.ContentHeaderContainer>

          {Array.isArray(selectedJournals) ? (
            selectedJournals.map((journal, index) => {
              const { id, content, createdAt, mood, imageUri } = journal;
              return (
                <Fragment key={journal.id}>
                  {index > 0 && <S.Separator />}
                  <FadeIn delay={ANIMATION_DELAY_MS[0]}>
                    <JournalCard
                      {...{
                        id,
                        content,
                        mood,
                        imageUri,
                        createdAt,
                        onDeletePress: handleDeletePress,
                      }}
                    />
                  </FadeIn>
                </Fragment>
              );
            })
          ) : (
            <FadeIn>
              <EmptyJournal isToday={isToday(selectedJournals)} />
            </FadeIn>
          )}
        </Container>
      </ScrollView>

      <BottomSheet {...{ open, setOpen }}>
        <DeleteJournalModal journalId={journalToDeleteId} setOpen={setOpen} />
      </BottomSheet>
    </>
  );
};
