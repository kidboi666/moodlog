import { useCallback, useState } from 'react';
import { CalendarUtils } from 'react-native-calendars';
import { ISODateString } from '@/types/date.types';

export const useCalendar = (callback?: (date: ISODateString) => void) => {
  const now = new Date();
  const todayString = CalendarUtils.getCalendarDateString(now);

  const [selectedDate, setSelectedDate] = useState<ISODateString>(todayString);

  const handleSelectedDateChange = useCallback(
    (date: ISODateString) => {
      setSelectedDate(date);
      callback?.(date);
    },
    [callback],
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
    onSelectedDateChange: handleSelectedDateChange,

    isToday: (date: ISODateString) => date === todayString,
    isSelected: (date: ISODateString) => date === selectedDate,
    isFuture: (date: ISODateString) => date > todayString,
  };
};
