import React, { Fragment } from 'react';
import { ScrollView } from 'tamagui';
import { JournalCard } from '@/features/journal/components/JournalCard';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { EmptyJournal } from '@/features/journal/components/EmptyJournal';
import { GardenSection } from '@/features/entries/components/GardenSection';
import { CARD_DELAY } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import * as S from './Entries.styled';
import { useJournal } from '@/core/store/contexts/journal.context';

export const EntriesScreen = () => {
  const { selectedJournals, removeJournal } = useJournal();
  const { t } = useTranslation();

  return (
    <ScrollView>
      <S.Container edges={['top']} padded>
        <S.Title>{t('entries.title')}</S.Title>
        <FadeIn delay={CARD_DELAY.FIRST}>
          <GardenSection />
        </FadeIn>

        <S.JournalBox>
          {Array.isArray(selectedJournals) ? (
            selectedJournals.map(journal => {
              const { content, imageUri, id, createdAt, mood } = journal;
              return (
                <Fragment key={id}>
                  <JournalCard
                    id={id}
                    content={content}
                    imageUri={imageUri}
                    createdAt={createdAt}
                    mood={mood}
                    onDelete={removeJournal}
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
