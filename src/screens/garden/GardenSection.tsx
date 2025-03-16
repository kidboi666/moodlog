import { ScrollView } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { GardenTitleHeader } from '@/screens/garden/GardenTitleHeader';
import { GardenDayUnits } from '@/screens/garden/GardenDayUnits';
import {
  getFirstDateDay,
  getLastDate,
  getMonthInISODateString,
  getWeekLength,
} from '@/utils/common';
import { useCallback, useMemo } from 'react';
import { useDate } from '@/store/hooks/useDate';
import { MONTHS } from '@/constants/date';
import { MonthKey } from '@/types/utils';
import { MonthItem } from '@/screens/garden/MonthItem';
import * as S from './GardenSection.styled';

export const GardenSection = () => {
  const { selectedYear, selectedMonth, onSelectedMonthChange } =
  useDate('entries');
  const { getEmotionForDate, getJournalsByMonth } = useJournal('entries');

  const months = useMemo(
    () =>
      Object.keys(MONTHS).map(month => ({
        monthKey: month as MonthKey,
        lastDate: getLastDate(selectedYear, month as MonthKey),
        firstDateDay: getFirstDateDay(selectedYear, month),
        weekLength: getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  );

  const handleMonthChange = useCallback(
    (ISOMonth: MonthKey) => {
      if (selectedMonth === getMonthInISODateString(selectedYear, ISOMonth)) {
        onSelectedMonthChange(null);
        return;
      }
      onSelectedMonthChange(getMonthInISODateString(selectedYear, ISOMonth));
      getJournalsByMonth(
        getMonthInISODateString(selectedYear, Number(ISOMonth)),
      );
    },
    [selectedYear, selectedMonth, onSelectedMonthChange, getJournalsByMonth],
  );

  return (
    <S.Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <S.StackBox>
          {months.map((monthData, i) => {
            const isSelected =
              selectedMonth ===
              getMonthInISODateString(selectedYear, monthData.monthKey);

            return (
              <MonthItem
                key={i}
                monthData={monthData}
                isSelected={isSelected}
                onMonthChange={handleMonthChange}
                selectedYear={selectedYear}
                getEmotionForDate={getEmotionForDate}
              />
            );
          })}
        </S.StackBox>
      </ScrollView>
    </S.Container>
  );
};
