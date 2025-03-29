import { ScrollView } from 'tamagui';
import { GardenTitleHeader } from '@/features/entries/components/GardenTitleHeader';
import { GardenDayUnits } from '@/features/entries/components/GardenDayUnits';
import { getFirstDateDay, getLastDate, getWeekLength } from '@/utils/date';
import { useCallback, useMemo } from 'react';
import { MONTHS } from '@/core/constants/date';
import { MonthItem } from '@/features/entries/components/MonthItem';
import * as S from './GardenSection.styled';
import { ISOMonthString, MonthKey } from '@/types/date.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useCalendar } from '@/core/hooks/useCalendar';

export const GardenSection = () => {
  const { getMoodForDate, selectJournals } = useJournal();
  const {
    selectedYear,
    selectedMonth,
    onSelectedMonthChange,
    isSelectedMonth,
  } = useCalendar();

  const staticMonths = useMemo(
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
    (monthDate: ISOMonthString) => {
      onSelectedMonthChange(selectedMonth === monthDate ? null : monthDate);

      setTimeout(() => {
        selectJournals(selectedMonth === monthDate ? null : monthDate);
      }, 0);
    },
    [selectedMonth, onSelectedMonthChange, selectJournals],
  );

  return (
    <S.Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <S.StackBox>
          {staticMonths.map(staticMonth => (
            <MonthItem
              key={staticMonth.monthKey}
              monthData={staticMonth}
              isSelected={isSelectedMonth(staticMonth.monthDate)}
              onMonthChange={handleMonthChange}
              getMoodForDate={getMoodForDate}
            />
          ))}
        </S.StackBox>
      </ScrollView>
    </S.Container>
  );
};
