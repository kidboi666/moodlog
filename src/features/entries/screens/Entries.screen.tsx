import React, { Fragment } from 'react';
import { useJournal } from '@/core/store/hooks/useJournal';
import { ScrollView } from 'tamagui';
import { JournalCard } from '@/core/components/JournalCard';
import { FadeIn } from '@/core/components/FadeIn';
import { EmptyJournal } from '@/core/components/EmptyJournal';
import { GardenSection } from '@/features/entries/components/GardenSection';
import { CARD_DELAY } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import * as S from './Entries.styled';

export const EntriesScreen = () => {
  const { monthlyJournals, removeJournal } = useJournal('entries');
  const { t } = useTranslation();
  return (
    <ScrollView>
      <S.Container edges={['top']} padded>
        <S.Title>{t('entries.title')}</S.Title>
        <FadeIn delay={CARD_DELAY.FIRST}>
          <GardenSection />
        </FadeIn>

        <FadeIn delay={CARD_DELAY.SECOND}>
          <S.JournalWrapper>
            {Array.isArray(monthlyJournals) ? (
              monthlyJournals.map(journal => {
                const { content, imageUri, id, createdAt, emotion } = journal;
                return (
                  <Fragment key={id}>
                    <JournalCard
                      id={id}
                      content={content}
                      imageUri={imageUri}
                      createdAt={createdAt}
                      emotion={emotion}
                      onDelete={removeJournal}
                    />
                  </Fragment>
                );
              })
            ) : (
              <EmptyJournal isToday={false} />
            )}
          </S.JournalWrapper>
        </FadeIn>
      </S.Container>
    </ScrollView>
  );
};
