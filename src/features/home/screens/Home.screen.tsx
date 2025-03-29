import { useTranslation } from 'react-i18next';
import React, { Fragment, useCallback, useEffect } from 'react';
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
import { useJournal } from '@/core/store/contexts/journal.context';
import { useUser } from '@/core/store/contexts/user.context';
import { useCalendar } from '@/core/hooks/useCalendar';
import { WeekDay } from '@/features/home/components/WeekDay';
import { useToastController } from '@tamagui/toast';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import * as S from './Home.styled';

export const HomeScreen = () => {
  const { selectedJournals, selectJournals, isLoading, removeJournal } =
    useJournal();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const toast = useToastController();
  const { isToday, selectedDate } = useCalendar();
  const { t } = useTranslation();
  const { userInfo } = useUser();

  const handleDeletePress = useCallback(
    (id: string) => {
      showBottomSheet(BottomSheetType.DELETE_JOURNAL, {
        journalId: id,
        isLoading,
        onDelete: removeJournal,
        hideBottomSheet,
        onSuccess: () => {
          selectJournals(selectedDate);
          toast.show(t('notifications.success.delete'));
        },
      });
    },
    [
      showBottomSheet,
      isLoading,
      removeJournal,
      selectJournals,
      selectedDate,
      toast,
    ],
  );

  useEffect(() => {
    selectJournals(selectedDate);
  }, [selectJournals]);

  return (
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
                <FadeIn
                  delay={
                    ANIMATION_DELAY_MS[index % ANIMATION_DELAY_SECONDS.length]
                  }
                >
                  <JournalCard
                    {...{
                      id,
                      content,
                      moodType: mood.type,
                      moodLevel: mood.level,
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
  );
};
