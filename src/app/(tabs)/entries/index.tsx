import {
  getCountOfNextMonth,
  getCountOfPrevMonth,
  getMonthStringWithoutYear,
} from '@/utils/common';
import React, { Fragment, useMemo, useTransition } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useDate } from '@/store/hooks/useDate';
import { ScrollView, Separator, useTheme, YStack } from 'tamagui';
import { JournalCard } from '@/components/JournalCard';
import { FadeIn } from '@/components/FadeIn';
import { EmptyJournal } from '@/components/EmptyJournal';
import { GardenSection } from '@/screens/garden/GardenSection';
import { CARD_DELAY } from '@/constants/time';
import * as S from '@/styles/entries/Entries.styled';
import { useTranslation } from 'react-i18next';

export default function EntriesScreen() {
  const theme = useTheme();
  const {
    selectedMonth,
    selectedYear,
    selectedDate,
    currentMonth,
    onSelectedDateChange,
    onSelectedMonthChange,
  } = useDate('entries');
  const { dailyJournals, journals, getDateCountsForMonth } =
    useJournal('entries');
  const pastScrollRange = getCountOfPrevMonth(selectedDate);
  const futureScrollRange = getCountOfNextMonth(selectedDate);
  const {t} = useTranslation()

  const dateCounts = useMemo(() => {
    return getDateCountsForMonth(
      selectedYear,
      selectedMonth
        ? getMonthStringWithoutYear(selectedMonth)
        : currentMonth + 1,
    );
  }, [
    journals,
    selectedMonth,
    selectedYear,
    currentMonth,
    getDateCountsForMonth,
  ]);

  return (
    <ScrollView>
      <S.Container edges={['top']} padded>
        <S.Title>{t('entries.title')}</S.Title>
        <FadeIn delay={CARD_DELAY.FIRST}>
          <GardenSection />
        </FadeIn>

        {/*<CalendarListBase*/}
        {/*  dateCounts={dateCounts}*/}
        {/*  onSelectedDateChange={onSelectedDateChange}*/}
        {/*  onSelectedMonthChange={onSelectedMonthChange}*/}
        {/*  selectedDate={selectedDate}*/}
        {/*  pastScrollRange={pastScrollRange}*/}
        {/*  futureScrollRange={futureScrollRange}*/}
        {/*  theme={{*/}
        {/*    calendarBackground: theme.background.val,*/}
        {/*    monthTextColor: theme.gray11.val,*/}
        {/*    textMonthFontWeight: '800',*/}
        {/*  }}*/}
        {/*/>*/}
        <FadeIn delay={CARD_DELAY.SECOND}>
          <YStack>
            {Array.isArray(dailyJournals) ? (
              dailyJournals.map((journal, index) => (
                <Fragment key={journal.id}>
                  {index > 0 && <Separator />}
                  <FadeIn delay={100 * (index + 1)}>
                    <JournalCard journal={journal} />
                  </FadeIn>
                </Fragment>
              ))
            ) : (
              <EmptyJournal date={dailyJournals} />
            )}
          </YStack>
        </FadeIn>
      </S.Container>
    </ScrollView>
  );
}
