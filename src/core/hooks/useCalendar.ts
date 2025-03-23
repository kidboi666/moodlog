import { useCallback, useState } from 'react';
import { CalendarUtils } from 'react-native-calendars';
import { ISODateString, ISOMonthString } from '@/types/date.types';

export const useCalendar = () => {
  const now = new Date();
  const todayString = CalendarUtils.getCalendarDateString(now);

  const [selectedDate, setSelectedDate] = useState<ISODateString | null>(
    todayString,
  );
  const [selectedMonth, setSelectedMonth] = useState<ISOMonthString | null>(
    todayString.split('-')[1],
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    Number(todayString.split('-')[0]),
  );

  const handleSelectedDateChange = useCallback(
    (
      date: ISODateString | null,
      callback?: (date: ISODateString | null) => void,
    ) => {
      setSelectedDate(date);
      callback?.(date);
    },
    [],
  );

  const handleSelectedMonthChange = useCallback(
    (
      month: ISOMonthString | null,
      callback?: (month: ISOMonthString | null) => void,
    ) => {
      setSelectedMonth(month);
      callback?.(month);
    },
    [],
  );

  const handleSelectedYearChange = useCallback(
    (year: number, callback?: (year: number) => void) => {
      setSelectedYear(year);
      callback?.(year);
    },
    [],
  );

  return {
    now,
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
    currentDate: now.getDate(),
    currentDay: now.getDay(),
    todayString,
    currentHour: now.getHours(),
    currentMinute: now.getMinutes(),

    selectedDate,
    selectedMonth,
    selectedYear,
    onSelectedDateChange: handleSelectedDateChange,
    onSelectedMonthChange: handleSelectedMonthChange,
    onSelectedYearChange: handleSelectedYearChange,

    isToday: (date: ISODateString | null) => date === todayString,
    isSelected: (date: ISODateString) => date === selectedDate,
    isSelectedMonth: (month: ISOMonthString) => month === selectedMonth,
    isFuture: (date: ISODateString) => date > todayString,
  };
};
