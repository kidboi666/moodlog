import { Group } from 'tamagui';
import * as S from '@/features/statistics/components/TimeRangeZone.styled';
import { TimeRange } from '@/types/statistic.types';
import { useTranslation } from 'react-i18next';

interface Props {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

export const TimeRangeZone = ({ timeRange, onTimeRangeChange }: Props) => {
  const { t } = useTranslation();
  return (
    <S.XGroupBox orientation="horizontal">
      <Group.Item>
        <S.TimeRangeButton
          onPress={() => onTimeRangeChange(TimeRange.YEARLY)}
          isSelected={timeRange === TimeRange.YEARLY}
        >
          {t('statistics.timeRange.yearly')}
        </S.TimeRangeButton>
      </Group.Item>
      <S.Separator />
      <Group.Item>
        <S.TimeRangeButton
          onPress={() => onTimeRangeChange(TimeRange.MONTHLY)}
          isSelected={timeRange === TimeRange.MONTHLY}
        >
          {t('statistics.timeRange.monthly')}
        </S.TimeRangeButton>
      </Group.Item>
      <Group.Item>
        <S.TimeRangeButton
          onPress={() => onTimeRangeChange(TimeRange.WEEKLY)}
          isSelected={timeRange === TimeRange.WEEKLY}
        >
          {t('statistics.timeRange.weekly')}
        </S.TimeRangeButton>
      </Group.Item>
    </S.XGroupBox>
  );
};
