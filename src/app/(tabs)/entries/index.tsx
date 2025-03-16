import React, { Fragment } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ScrollView } from 'tamagui';
import { JournalCard } from '@/components/JournalCard';
import { FadeIn } from '@/components/FadeIn';
import { EmptyJournal } from '@/components/EmptyJournal';
import { GardenSection } from '@/screens/garden/GardenSection';
import { CARD_DELAY } from '@/constants/time';
import * as S from '@/styles/entries/Entries.styled';
import { useTranslation } from 'react-i18next';

export default function EntriesScreen() {
  const { monthlyJournals } = useJournal('entries');
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
              monthlyJournals.map(journal => (
                <Fragment key={journal.id}>
                  <JournalCard journal={journal} />
                </Fragment>
              ))
            ) : (
              <EmptyJournal isToday={false} />
            )}
          </S.JournalWrapper>
        </FadeIn>
      </S.Container>
    </ScrollView>
  );
}
