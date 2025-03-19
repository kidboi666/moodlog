import { H2, H3, Text, XStack } from 'tamagui';
import { Maximize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { JournalStats } from '@/core/types/entries';
import * as S from './CollapsedContent.styled';
import { memo } from 'react';

interface Props {
  journalStats: JournalStats;
}

export const CollapsedContent = memo(({ journalStats }: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <H3>{t('statistics.totalCount.title')}</H3>
        <Text>{t('statistics.totalCount.description')}</Text>
      </S.YStackContainer>
      <XStack>
        <S.StackContainer>
          <H2>{journalStats.totalCount}</H2>
          <S.CountText>{t('common.units.count')}</S.CountText>
        </S.StackContainer>
        <S.MinimizeButton icon={Maximize2} />
      </XStack>
    </S.ViewContainer>
  );
});
