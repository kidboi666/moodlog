import React, { memo, useMemo } from 'react';
import { HorizontalCalendar } from '@/features/home/components/HorizontalCalendar';
import { useTranslation } from 'react-i18next';
import {
  getISODateString,
  getLastDate,
  getMonthString,
} from '@/core/utils/common';
import * as S from './WeekDay.styled';

import { ISODateString } from '@/types/date.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useDate } from '@/core/store/contexts/date.context';

export const WeekDay = memo(() => {
  const {
    currentMonth,
    currentYear,
    currentDate,
    selectedDate,
    onSelectedDateChange,
  } = useDate('week');
  const { journals, getCountForMonth } = useJournal('week');
  const { t } = useTranslation();

  const dateCounts = useMemo(
    () => getCountForMonth(currentYear, getMonthString(currentMonth)),
    [journals, currentMonth],
  );

  const dates: ISODateString[] = useMemo(() => {
    const lastDate = getLastDate(currentYear, currentMonth);

    return Array.from({ length: lastDate }, (_, i) => {
      return getISODateString(currentYear, currentMonth, i + 1);
    });
  }, [currentYear, currentMonth]);

  return (
    <S.WeekDayContainer>
      <S.OuterGradientBox>
        <S.InnerGradientBox>
          <S.CurrentMonthBox>
            <S.CurrentMonthText>
              {t(`calendar.months.${getMonthString(currentMonth)}`)}.
            </S.CurrentMonthText>
          </S.CurrentMonthBox>
          <HorizontalCalendar
            dates={dates}
            dateCounts={dateCounts}
            selectedDate={selectedDate}
            currentDate={currentDate}
            onSelectedDateChange={onSelectedDateChange}
          />
        </S.InnerGradientBox>
      </S.OuterGradientBox>
    </S.WeekDayContainer>
  );
});
