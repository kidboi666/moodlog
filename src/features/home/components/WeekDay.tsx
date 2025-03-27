import React from 'react';
import { HorizontalCalendar } from '@/features/home/components/HorizontalCalendar';
import { useTranslation } from 'react-i18next';
import { getMonthKey } from '@/utils/date';
import * as S from './WeekDay.styled';

export const WeekDay = () => {
  const { t } = useTranslation();

  return (
    <S.WeekDayContainer>
      <S.OuterGradientBox>
        <S.InnerGradientBox>
          <S.CurrentMonthBox>
            <S.CurrentMonthText>
              {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
            </S.CurrentMonthText>
          </S.CurrentMonthBox>
          <HorizontalCalendar />
        </S.InnerGradientBox>
      </S.OuterGradientBox>
    </S.WeekDayContainer>
  );
};
