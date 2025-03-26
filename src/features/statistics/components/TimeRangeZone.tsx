import { Group } from 'tamagui';
import * as S from '@/features/statistics/components/TimeRangeZone.styled';
import { TimeRange } from '@/types/statistic.types';

interface Props {
  timeRange: TimeRange;
  onWeekly: () => void;
  onMonthly: () => void;
}

export const TimeRangeZone = ({ timeRange, onWeekly, onMonthly }: Props) => {
  return (
    <S.XGroupBox orientation="horizontal">
      <Group.Item>
        <S.TimeRangeButton
          onPress={onWeekly}
          isSelected={timeRange === TimeRange.YEARLY}
        >
          주간
        </S.TimeRangeButton>
      </Group.Item>
      <S.Separator />
      <Group.Item>
        <S.TimeRangeButton
          onPress={onMonthly}
          isSelected={timeRange === TimeRange.MONTHLY}
        >
          월간
        </S.TimeRangeButton>
      </Group.Item>
    </S.XGroupBox>
  );
};
