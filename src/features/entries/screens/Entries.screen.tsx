import { Fragment, useCallback } from 'react';
import { ScrollView } from 'tamagui';
import { JournalCard } from '@/features/journal/components/JournalCard';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { EmptyJournal } from '@/features/journal/components/EmptyJournal';
import { GardenSection } from '@/features/entries/components/GardenSection';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useCalendar } from '@/core/hooks/useCalendar';
import * as S from './Entries.styled';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';

export const EntriesScreen = () => {
  const { selectedJournals, selectJournals, isLoading, removeJournal } =
    useJournal();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { selectedMonth } = useCalendar();
  const { t } = useTranslation();

  const handleDeletePress = useCallback((id: string) => {
    showBottomSheet(BottomSheetType.DELETE_JOURNAL, {
      journalId: id,
      isLoading,
      onDelete: removeJournal,
      hideBottomSheet,
      onSuccess: () => {
        selectJournals(selectedMonth);
      },
    });
  }, []);

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
                      moodType: mood.type,
                      moodLevel: mood.level,
                      onDeletePress: handleDeletePress,
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
