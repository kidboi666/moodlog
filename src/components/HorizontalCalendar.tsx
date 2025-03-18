import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'tamagui';
import { ISODateString } from '@/types/dtos/date';
import { CALENDAR_SCROLL_SIZE } from '@/constants/size';
import { DateCounts } from '@/types/entries';
import { CalendarUtils } from 'react-native-calendars';
import { DateCountDot } from '@/components/DateCountDot';
import { useTranslation } from 'react-i18next';
import { getDateInISODateString, getDayInISODateString } from '@/utils/common';
import * as S from './HorizontalCalendar.styled';

interface Props {
  dates: ISODateString[];
  selectedDate: ISODateString;
  dateCounts: DateCounts;
  currentDate: Date;
  onSelectedDateChange: (date: ISODateString) => void;
}

export const HorizontalCalendar = ({
  dateCounts,
  dates,
  selectedDate,
  currentDate,
  onSelectedDateChange,
}: Props) => {
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectedDateChange = (date: ISODateString) => {
    if (CalendarUtils.getCalendarDateString(currentDate) >= date) {
      onSelectedDateChange(date);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (dates.length > 0) {
      const selectedIndex = dates.findIndex(date => date === selectedDate);
      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: selectedIndex * CALENDAR_SCROLL_SIZE,
            animated: true,
          });
        }
      }, 1300);
    }

    return () => clearTimeout(timeout);
  }, [dates]);

  return (
    <S.CalendarContainer>
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={CALENDAR_SCROLL_SIZE}
        >
          {dates.map(date => {
            const isToday =
              date === CalendarUtils.getCalendarDateString(currentDate);
            const isFuture =
              date > CalendarUtils.getCalendarDateString(currentDate);
            return (
              <S.DateContainer
                key={date}
                isSelected={selectedDate === date}
                isToday={isToday}
                onPress={() => handleSelectedDateChange(date)}
              >
                <S.DateWrapper>
                  <S.DateTextWrapper>
                    <S.DayText isSelected={selectedDate === date}>
                      {t(`calendar.days.${getDayInISODateString(date)}`)}
                    </S.DayText>
                    <S.DateText
                      isFuture={
                        isFuture
                          ? '$gray11'
                          : selectedDate === date
                            ? '$gray12'
                            : '$gray6'
                      }
                    >
                      {getDateInISODateString(date)}
                    </S.DateText>
                  </S.DateTextWrapper>
                  <DateCountDot
                    variant="contained"
                    dateCounts={dateCounts}
                    dateString={date}
                    isSelected={selectedDate === date}
                  />
                </S.DateWrapper>
              </S.DateContainer>
            );
          })}
        </ScrollView>
      </View>
    </S.CalendarContainer>
  );
};
