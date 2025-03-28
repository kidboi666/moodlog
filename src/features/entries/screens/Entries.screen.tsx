import React, { Fragment, useCallback } from 'react';
import { ScrollView } from 'tamagui';
import { JournalCard } from '@/features/journal/components/JournalCard';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { EmptyJournal } from '@/features/journal/components/EmptyJournal';
import { GardenSection } from '@/features/entries/components/GardenSection';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import * as S from './Entries.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useBottomSheet } from '@/core/hooks/useBottomSheet';
import { useRouter } from 'expo-router';

export const EntriesScreen = () => {
  const router = useRouter();
  const { selectedJournals, removeJournal } = useJournal();
  const { isOpen, setIsOpen, openSheet, closeSheet } = useBottomSheet();
  const { t } = useTranslation();

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ScrollView>
      <S.Container edges={['top']} padded>
        <S.Title>{t('entries.title')}</S.Title>
        <FadeIn delay={ANIMATION_DELAY_MS[0]}>
          <GardenSection />
        </FadeIn>

        <S.JournalBox>
          {Array.isArray(selectedJournals) ? (
            selectedJournals.map(journal => {
              const { content, imageUri, id, createdAt, mood } = journal;
              return (
                <Fragment key={id}>
                  <JournalCard
                    {...{
                      id,
                      content,
                      imageUri,
                      createdAt,
                      mood,
                      onDelete: removeJournal,
                      onDeleteSuccess: handleGoBack,
                      isOpen,
                      setIsOpen,
                      openSheet,
                      closeSheet,
                    }}
                  />
                </Fragment>
              );
            })
          ) : (
            <EmptyJournal isToday={false} />
          )}
        </S.JournalBox>
      </S.Container>
    </ScrollView>
  );
};
