import {
  Calendar,
  CalendarProps,
  CalendarUtils,
  DateData,
} from 'react-native-calendars';
import { Button } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import React, { memo, useCallback, useMemo } from 'react';
import { Direction } from 'react-native-calendars/src/types';
import { CustomDayComponent } from '@/features/calendar/components/CustomDayComponent';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import { CalendarCustomHeader } from '@/features/calendar/components/CalendarCustomHeader';
import { getMonthInISODateString } from '@/core/utils/common';
import { ArrowButton } from '@/features/calendar/components/ArrowButton';
import {
  DateCounts,
  ISODateString,
  ISOMonthString,
} from '@/core/types/date.types';

const LeftArrow = () => (
  <Button unstyled p="$1" color="$gray10" icon={<ArrowLeft size="$1" />} />
);

const RightArrow = () => (
  <Button unstyled p="$1" color="$gray10" icon={<ArrowRight size="$1" />} />
);

interface Props extends CalendarProps {
  dateCounts: DateCounts;
  onSelectedDateChange: (date: ISODateString) => void;
  onSelectedMonthChange: (month: ISOMonthString) => void;
  selectedDate?: ISODateString;
  pastScrollRange: number;
  futureScrollRange: number;
}

export const CalendarListBase = memo(
  ({
    dateCounts,
    pastScrollRange,
    futureScrollRange,
    onSelectedDateChange,
    onSelectedMonthChange,
    selectedDate,
    ...props
  }: Props) => {
    const handleDayPress = useCallback(
      (date: DateData) => {
        onSelectedDateChange(date.dateString as ISODateString);
      },
      [onSelectedDateChange],
    );

    const markedDates = useMemo(() => {
      if (selectedDate) {
        return {
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
          },
        };
      }
      return {};
    }, [selectedDate]);

    const DayComponentWrapper = useCallback(
      (props: DayProps) => {
        const { date, state, marking } = props;

        if (!date) {
          return null;
        }

        return (
          <CustomDayComponent
            date={date as unknown as DateData}
            state={state!}
            dateCounts={dateCounts}
            marking={marking!}
            onPress={() => handleDayPress(date as unknown as DateData)}
          />
        );
      },
      [dateCounts, handleDayPress],
    );

    const renderHeader = useCallback(
      (date: any) => <CalendarCustomHeader date={date} />,
      [],
    );

    const renderArrow = useCallback(
      (direction: Direction) =>
        direction === 'left' ? (
          <ArrowButton icon={ArrowLeft} />
        ) : (
          <ArrowButton icon={ArrowRight} />
        ),
      [],
    );

    return (
      <Calendar
        renderHeader={renderHeader}
        dayComponent={DayComponentWrapper}
        pastScrollRange={pastScrollRange}
        futureScrollRange={futureScrollRange}
        onMonthChange={({ dateString }: Pick<DateData, 'dateString'>) =>
          onSelectedMonthChange(
            getMonthInISODateString(
              new Date(dateString).getFullYear(),
              new Date(dateString).getMonth(),
            ),
          )
        }
        hideExtraDays
        current={selectedDate}
        maxDate={CalendarUtils.getCalendarDateString(new Date())}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        renderArrow={renderArrow}
        enableSwipeMonths
        animateScroll
        {...props}
      />
    );
  },
);
