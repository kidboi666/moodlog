import { useTranslation } from 'react-i18next';
import { H2, H3, Text, XStack } from 'tamagui';
import { Maximize2 } from '@tamagui/lucide-icons';
import { getMonthStringWithoutYear } from '@/core/utils/common';
import { SelectedMonthStats } from '@/core/types/entries';
import * as S from './CollapsedContent.styled';

interface Props {
  selectedMonthStats: SelectedMonthStats;
}

export const CollapsedContent = ({ selectedMonthStats }: Props) => {
  const { t } = useTranslation();
  const { month: ISOMonthString, count } = selectedMonthStats ?? null;
  const month = getMonthStringWithoutYear(ISOMonthString);

  return (
    <S.ViewContainer>
      <S.TitleBox>
        <H3>
          {t('statistics.statistics.currentMonth.title', {
            month: t(`calendar.months.${month}`),
          })}
        </H3>
        <Text>{t('statistics.statistics.currentMonth.description')}</Text>
      </S.TitleBox>
      <XStack>
        <S.CountBox>
          <H2>{count}</H2>
          <S.CountUnitText>{t('common.units.count')}</S.CountUnitText>
        </S.CountBox>
        <S.MaximizeButton icon={Maximize2} />
      </XStack>
    </S.ViewContainer>
  );
};
