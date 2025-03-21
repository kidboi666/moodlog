import { useEffect, useMemo, useRef } from 'react';
import { ScrollView, View } from 'tamagui';
import { CALENDAR_SCROLL_SIZE } from '@/core/constants/size';
import { DateCountDot } from '@/features/home/components/DateCountDot';
import { useTranslation } from 'react-i18next';
import {
  getDateInISODateString,
  getDayInISODateString,
  getISODateString,
  getLastDate,
} from '@/core/utils/common';
import * as S from './HorizontalCalendar.styled';
import { ISODateString } from '@/types/date.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useCalendar } from '@/core/hooks/useCalendar';

export const HorizontalCalendar = () => {
  const { journals, getCountForMonth, onDailyJournalsChange } = useJournal();
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    currentYear,
    currentMonth,
    onSelectedDateChange,
    isToday,
    isFuture,
    isSelected,
  } = useCalendar(onDailyJournalsChange);

  const dateCounts = useMemo(
    () => getCountForMonth(currentYear, currentMonth),
    [journals],
  );

  const dates: ISODateString[] = useMemo(() => {
    const lastDate = getLastDate(currentYear, currentMonth);

    return Array.from({ length: lastDate }, (_, i) => {
      return getISODateString(currentYear, currentMonth, i + 1);
    });
  }, [currentYear, currentMonth]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (dates.length > 0) {
      const selectedIndex = dates.findIndex(date => isSelected(date));
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
            return (
              <S.DateContainer
                key={date}
                isSelected={isSelected(date)}
                isToday={isToday(date)}
                onPress={() => onSelectedDateChange(date)}
              >
                <S.DateWrapper>
                  <S.DateTextWrapper>
                    <S.DayText isSelected={isSelected(date)}>
                      {t(`calendar.days.${getDayInISODateString(date)}`)}
                    </S.DayText>
                    <S.DateText
                      futureDateColor={
                        isFuture(date)
                          ? '$gray11'
                          : isSelected(date)
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
                    isSelected={isSelected(date)}
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
