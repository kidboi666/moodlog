import React, { useCallback, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toSingle } from '@/utils/common';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { useApp } from '@/core/store/contexts/app.context';
import { useTranslation } from 'react-i18next';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import * as S from '@/styles/screens/journal/Journal.styled';
import { JournalHeader } from '@/core/components/features/journal/components/JournalHeader';
import { moodTheme } from '@/core/constants/themes';

export default function Screen() {
  const { id } = useLocalSearchParams();
  const journalId = toSingle(id);
  const router = useRouter();
  const { selectedJournal, selectJournal, isLoading, removeJournal } =
    useJournal();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { fontSize } = useApp();
  const { t } = useTranslation();

  const handleDeletePress = useCallback(() => {
    showBottomSheet(BottomSheetType.DELETE_JOURNAL, {
      journalId,
      isLoading,
      onDelete: removeJournal,
      hideBottomSheet,
      onSuccess: () => {
        router.push('/entries');
      },
    });
  }, [showBottomSheet, journalId, isLoading, removeJournal, router]);

  useEffect(() => {
    selectJournal(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <S.ScrollViewContainer
      overScrollMode="always"
      edges={['bottom']}
      Header={
        <JournalHeader
          journal={selectedJournal}
          onDeletePress={handleDeletePress}
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
    </S.ScrollViewContainer>
  );
}
