import { ScrollView } from 'tamagui';
import React, { useEffect } from 'react';
import { useJournal } from '@/core/store/hooks/useJournal';
import { useApp } from '@/core/store/hooks/useApp';
import { moodTheme } from '@/core/constants/themes';
import { useTranslation } from 'react-i18next';
import { useScroll } from '@/core/store/hooks/useScroll';
import { toSingle } from '@/core/utils/common';
import JournalHeader from '@/features/journal/components/JournalHeader';
import * as S from './Journal.styled';

interface Props {
  journalId: string;
}

export const JournalScreen = ({ journalId }: Props) => {
  const { selectedJournal, onSelectedJournalChange } = useJournal();
  const { fontSize } = useApp();
  const { onScroll } = useScroll();
  const { t } = useTranslation();

  useEffect(() => {
    onSelectedJournalChange(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <ScrollView onScroll={onScroll} overScrollMode="always">
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
