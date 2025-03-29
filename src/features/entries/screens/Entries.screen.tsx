import React, { Fragment, useCallback, useState } from 'react';
import { ScrollView } from 'tamagui';
import { JournalCard } from '@/features/journal/components/JournalCard';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { EmptyJournal } from '@/features/journal/components/EmptyJournal';
import { GardenSection } from '@/features/entries/components/GardenSection';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import * as S from './Entries.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { BottomSheet } from '@/core/components/modals/BottomSheet';
import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';
import { useCalendar } from '@/core/hooks/useCalendar';

export const EntriesScreen = () => {
  const { selectedJournals, selectJournals } = useJournal();
  const { selectedMonth } = useCalendar();
  const [open, setOpen] = useState(false);
  const [journalToDeleteId, setJournalToDeleteId] = useState('');
  const { t } = useTranslation();

  const handleDeleteSuccess = useCallback(() => {
    selectJournals(selectedMonth);
  }, [selectJournals, selectedMonth]);

  const handleDeletePress = useCallback((id: string) => {
    setJournalToDeleteId(id);
    setOpen(true);
  }, []);

  return (
    <>
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

      <BottomSheet {...{ open, setOpen }}>
        <DeleteJournalModal
          journalId={journalToDeleteId}
          setOpen={setOpen}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </BottomSheet>
    </>
  );
};
