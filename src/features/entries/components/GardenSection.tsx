import { ScrollView } from 'tamagui';
import { GardenTitleHeader } from '@/features/entries/components/GardenTitleHeader';
import { GardenDayUnits } from '@/features/entries/components/GardenDayUnits';
import {
  getFirstDateDay,
  getLastDate,
  getMonthInISODateString,
  getWeekLength,
} from '@/core/utils/common';
import { useCallback, useMemo } from 'react';
import { MONTHS } from '@/core/constants/date';
import { MonthItem } from '@/features/entries/components/MonthItem';
import * as S from './GardenSection.styled';
import { ISOMonthString, MonthKey } from '@/types/date.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useDate } from '@/core/store/contexts/date.context';

export const GardenSection = () => {
  const { selectedYear, selectedMonth, onSelectedMonthChange } =
    useDate('entries');
  const { getMoodForDate, onMonthlyJournalsChange } = useJournal('entries');
  const months = useMemo(
    () =>
      Object.keys(MONTHS).map((month, i) => ({
        monthKey: month as MonthKey,
        monthDate:
          `${selectedYear}-${(i + 1).toString().padStart(2, '0')}` as ISOMonthString,
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
        onMonthlyJournalsChange('0000-00');
      } else {
        onSelectedMonthChange(getMonthInISODateString(selectedYear, ISOMonth));
      }
    },
    [
      selectedYear,
      selectedMonth,
      onSelectedMonthChange,
      onMonthlyJournalsChange,
    ],
  );

  return (
    <S.Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <S.StackBox>
          {months.map(monthData => {
            const isSelected = selectedMonth === monthData.monthDate;
            return (
              <MonthItem
                key={monthData.monthKey}
                monthData={monthData}
                isSelected={isSelected}
                onMonthChange={handleMonthChange}
                selectedYear={selectedYear}
                getMoodForDate={getMoodForDate}
              />
            );
          })}
        </S.StackBox>
      </ScrollView>
    </S.Container>
  );
};
