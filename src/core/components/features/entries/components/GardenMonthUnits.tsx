import { useTranslation } from 'react-i18next';
import * as S from './GardenMonthUnits.styled';
import { memo } from 'react';

interface Props {
  month: string;
  isSelected: boolean;
}

export const GardenMonthUnits = memo(({ month, isSelected }: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.MonthText isSelected={isSelected}>
        {t(`calendar.months.${month}`)}
      </S.MonthText>
    </S.ViewContainer>
  );
});
