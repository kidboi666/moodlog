import { ScrollView } from 'tamagui';
import React, { useEffect } from 'react';
import { moodTheme } from '@/core/constants/themes';
import { useTranslation } from 'react-i18next';
import { toSingle } from '@/core/utils/common';
import * as S from './Journal.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useApp } from '@/core/store/contexts/app.context';
import { useLocalSearchParams } from 'expo-router';
import { JournalHeader } from '@/features/journal/components/JournalHeader';

export const JournalScreen = () => {
  const { id } = useLocalSearchParams();
  const journalId = toSingle(id);
  const { selectedJournal, selectJournal } = useJournal();

  const { fontSize } = useApp();
  const { t } = useTranslation();

  useEffect(() => {
    selectJournal(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <ScrollView overScrollMode="always">
      <S.ViewContainer edges={['bottom']} Header={<JournalHeader />}>
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
  );
};
