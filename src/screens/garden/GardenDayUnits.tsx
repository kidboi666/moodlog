import { WEEK_DAY } from '@/constants/date';
import { useTranslation } from 'react-i18next';
import * as S from './GardenDayUnits.styled';

export const GardenDayUnits = () => {
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
};
