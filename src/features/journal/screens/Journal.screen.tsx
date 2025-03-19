import { ScrollView } from 'tamagui';
import React, { useEffect } from 'react';
import { useJournal } from '@/core/store/hooks/useJournal';
import { useApp } from '@/core/store/hooks/useApp';
import { emotionTheme } from '@/core/constants/themes';
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
            emotionColor={
              emotionTheme[selectedJournal.emotion.type][
                selectedJournal.emotion.level
              ]
            }
          />
          <S.ContentBox>
            <S.EmotionTextBox>
              <S.EmotionLevelText>
                {t(`emotions.levels.${selectedJournal.emotion?.level}`)}
              </S.EmotionLevelText>
              <S.EmotionTypeText>
                {t(`emotions.types.${selectedJournal.emotion?.type}`)}
              </S.EmotionTypeText>
            </S.EmotionTextBox>
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
