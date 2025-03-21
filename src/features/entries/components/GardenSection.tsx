import { ScrollView } from 'tamagui';
import { GardenTitleHeader } from '@/features/entries/components/GardenTitleHeader';
import { GardenDayUnits } from '@/features/entries/components/GardenDayUnits';
import {
  getFirstDateDay,
  getLastDate,
  getWeekLength,
} from '@/core/utils/common';
import { useCallback, useMemo } from 'react';
import { MONTHS } from '@/core/constants/date';
import { MonthItem } from '@/features/entries/components/MonthItem';
import * as S from './GardenSection.styled';
import { ISOMonthString, MonthKey } from '@/types/date.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useCalendar } from '@/core/hooks/useCalendar';

export const GardenSection = () => {
  const { getMoodForDate, onSelectedJournalsChange } = useJournal();
  const { selectedYear, selectedMonth, onSelectedMonthChange } = useCalendar();
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
    [selectedYear, selectedMonth],
  );

  const handleMonthChange = useCallback(
    (monthDate: ISOMonthString) => {
      if (selectedMonth === monthDate) {
        onSelectedMonthChange(null, onSelectedJournalsChange);
      } else {
        onSelectedMonthChange(monthDate, onSelectedJournalsChange);
      }
    },
    [
      selectedYear,
      selectedMonth,
      onSelectedMonthChange,
      onSelectedJournalsChange,
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
                getMoodForDate={getMoodForDate}
              />
            );
          })}
        </S.StackBox>
      </ScrollView>
    </S.Container>
  );
};
