import { Maximize2 } from '@tamagui/lucide-icons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from 'src/core/components/features/statistics/total-count/CollapsedContent.styled';
import { H2, H3, Text, XStack } from 'tamagui';

interface Props {
  totalCount: number;
}

export const CollapsedContent = memo(({ totalCount }: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <H3>{t('statistics.totalCount.title')}</H3>
        <Text>{t('statistics.totalCount.description')}</Text>
      </S.YStackContainer>
      <XStack>
        <S.StackContainer>
          <H2>{totalCount}</H2>
          <S.CountText>{t('common.units.count')}</S.CountText>
        </S.StackContainer>
        <S.MinimizeButton icon={Maximize2} />
      </XStack>
    </S.ViewContainer>
  );
});
