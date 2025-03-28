import { ScrollView } from 'tamagui';
import { useCallback, useEffect, useState } from 'react';
import { moodTheme } from '@/core/constants/themes';
import { useTranslation } from 'react-i18next';
import * as S from './Journal.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useApp } from '@/core/store/contexts/app.context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { JournalHeader } from '@/features/journal/components/JournalHeader';
import { toSingle } from '@/utils/common';
import { BottomSheet } from '@/core/components/modals/BottomSheet';
import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';

export const JournalScreen = () => {
  const { id } = useLocalSearchParams();
  const journalId = toSingle(id);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { selectedJournal, selectJournal } = useJournal();
  const { fontSize } = useApp();
  const { t } = useTranslation();

  const goBack = useCallback(() => {
    router.push('/entries');
  }, [router]);

  useEffect(() => {
    selectJournal(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <>
      <ScrollView overScrollMode="always">
        <S.ViewContainer
          edges={['bottom']}
          Header={
            <JournalHeader
              journal={selectedJournal}
              onDeletePress={() => setOpen(true)}
              onBackPress={() => router.back()}
            />
          }
        >
          <S.XStackContainer>
            <S.MoodBar
              moodColor={
                moodTheme[selectedJournal.mood.type][selectedJournal.mood.level]
              }
            />
            <S.ContentBox>
              <S.MoodTextBox>
                <S.MoodLevelText>
                  {t(`moods.levels.${selectedJournal.mood?.level}`)}
                </S.MoodLevelText>
                <S.MoodTypeText>
                  {t(`moods.types.${selectedJournal.mood?.type}`)}
                </S.MoodTypeText>
              </S.MoodTextBox>
              {selectedJournal.imageUri && (
                <S.ImageBox>
                  <S.Image source={{ uri: selectedJournal.imageUri }} />
                </S.ImageBox>
              )}

              <S.ContentText fontSize={fontSize}>
                {selectedJournal.content}
              </S.ContentText>
            </S.ContentBox>
          </S.XStackContainer>
        </S.ViewContainer>
      </ScrollView>

      <BottomSheet {...{ open, setOpen }}>
        <DeleteJournalModal
          onDeleteSuccess={goBack}
          journalId={journalId}
          setOpen={setOpen}
        />
      </BottomSheet>
    </>
  );
};
