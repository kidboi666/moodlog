import { WEEK_DAY } from '@/core/constants/date';
import { useTranslation } from 'react-i18next';
import * as S from './GardenDayUnits.styled';
import { memo } from 'react';

export const GardenDayUnits = memo(() => {
  const { t } = useTranslation();
  return (
    <S.DaysContainer>
      <S.EmptyBox />
      <S.DaysBox>
        {Object.keys(WEEK_DAY).map(day => (
          <S.DayText key={day}>{t(`calendar.daysShort.${day}`)}</S.DayText>
        ))}
      </S.DaysBox>
    </S.DaysContainer>
  );
});
