import React, { Fragment, useCallback, useEffect } from 'react';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useUser } from '@/core/store/contexts/user.context';
import { useToastController } from '@tamagui/toast';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { useTranslation } from 'react-i18next';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import { Container } from '@/core/components/shared/Container.styleable';
import * as S from '@/styles/screens/home/Home.styled';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import {
  ANIMATION_DELAY_MS,
  ANIMATION_DELAY_SECONDS,
} from '@/core/constants/time';
import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji';
import { H3 } from 'tamagui';
import { WeekDay } from '@/core/components/features/home/components/WeekDay';
import { JournalCard } from '@/core/components/features/journal/components/JournalCard';
import { EmptyJournal } from '@/core/components/features/journal/components/EmptyJournal';

export default function Screen() {
  const { selectedJournals, selectJournals, isLoading, removeJournal } =
    useJournal();
  const { isToday, selectedDate } = useCalendar();
  const { userInfo } = useUser();
  const toast = useToastController();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { t } = useTranslation();

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
    <Container.ScrollView
      overScrollMode="always"
      edges={['top', 'bottom']}
      padded
    >
      <S.ContentHeaderContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <S.WelcomeEmojiBox>
            <S.WelcomeTitleText>
              {t('common.greeting.hello')}
            </S.WelcomeTitleText>
            <ShakeEmoji emoji="👋" />
          </S.WelcomeEmojiBox>
          <H3>{t('common.greeting.welcome', { name: userInfo?.userName })}</H3>
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
                  id={id}
                  content={content}
                  moodType={mood.type}
                  moodLevel={mood.level}
                  imageUri={imageUri}
                  createdAt={createdAt}
                  onDeletePress={handleDeletePress}
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
    </Container.ScrollView>
  );
}
