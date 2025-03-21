import React, { memo } from 'react';
import { HorizontalCalendar } from '@/features/home/components/HorizontalCalendar';
import { useTranslation } from 'react-i18next';
import { getMonthString } from '@/core/utils/common';
import * as S from './WeekDay.styled';

export const WeekDay = memo(() => {
  const { t } = useTranslation();

  return (
    <S.WeekDayContainer>
      <S.OuterGradientBox>
        <S.InnerGradientBox>
          <S.CurrentMonthBox>
            <S.CurrentMonthText>
              {t(`calendar.months.${getMonthString(new Date().getMonth())}`)}.
            </S.CurrentMonthText>
          </S.CurrentMonthBox>
          <HorizontalCalendar />
        </S.InnerGradientBox>
      </S.OuterGradientBox>
    </S.WeekDayContainer>
  );
});
