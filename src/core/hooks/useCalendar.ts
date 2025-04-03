import { useCallback, useState } from 'react';
import { CalendarUtils } from 'react-native-calendars';
import { ISODateString, ISOMonthString } from '@/types/date.types';
import { getThisWeekIndex } from '@/utils/date';
import { Nullable } from '@/types/utill.types';

export const useCalendar = () => {
  const now = new Date();
  const todayString: ISODateString = CalendarUtils.getCalendarDateString(now);

  const [selectedDate, setSelectedDate] = useState<ISODateString | null>(
    todayString,
  );
  const [selectedMonth, setSelectedMonth] = useState<ISOMonthString | null>(
    todayString.substring(0, 7) as ISOMonthString,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    Number(todayString.split('-')[0]),
  );
  const [selectedWeek, setSelectedWeek] = useState(
    getThisWeekIndex(todayString),
  );

  const handleSelectedDateChange = useCallback((date: ISODateString | null) => {
    setSelectedDate(date);
  }, []);

  const handleSelectedMonthChange = useCallback(
    (month: ISOMonthString | null) => {
      setSelectedMonth(month);
    },
    [],
  );

  const handleSelectedYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleSelectedWeekChange = useCallback((date: ISODateString) => {
    setSelectedWeek(getThisWeekIndex(date));
  }, []);

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
    selectedWeek,
    onSelectedDateChange: handleSelectedDateChange,
    onSelectedMonthChange: handleSelectedMonthChange,
    onSelectedYearChange: handleSelectedYearChange,
    onSelectedWeekChange: handleSelectedWeekChange,

    isToday: (date: Nullable<ISODateString>) => date === todayString,
    isSelected: (date: ISODateString) => date === selectedDate,
    isSelectedMonth: (month: ISOMonthString) => month === selectedMonth,
    isFuture: (date: ISODateString) => date > todayString,
  };
};
