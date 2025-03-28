import { Group } from 'tamagui';
import * as S from '@/features/statistics/components/TimeRangeZone.styled';
import { TimeRange } from '@/types/statistic.types';
import { useTranslation } from 'react-i18next';

interface Props {
  timeRange: TimeRange;
  onWeekly: () => void;
  onMonthly: () => void;
}

export const TimeRangeZone = ({ timeRange, onWeekly, onMonthly }: Props) => {
  const { t } = useTranslation();
  return (
    <S.XGroupBox orientation="horizontal">
      <Group.Item>
        <S.TimeRangeButton
          onPress={onWeekly}
          isSelected={timeRange === TimeRange.YEARLY}
        >
          {t('statistics.timeRange.yearly')}
        </S.TimeRangeButton>
      </Group.Item>
      <S.Separator />
      <Group.Item>
        <S.TimeRangeButton
          onPress={onMonthly}
          isSelected={timeRange === TimeRange.MONTHLY}
        >
          {t('statistics.timeRange.monthly')}
        </S.TimeRangeButton>
      </Group.Item>
    </S.XGroupBox>
  );
};
