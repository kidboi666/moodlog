import { Group } from 'tamagui';
import * as S from '@/screens/stats/TimeRangeZone.styled';

interface Props {
  timeRange: 'weekly' | 'monthly';
  onWeekly: () => void;
  onMonthly: () => void;
}

export const TimeRangeZone = ({ timeRange, onWeekly, onMonthly }: Props) => {
  return (
    <S.XGroupBox orientation="horizontal">
      <Group.Item>
        <S.TimeRangeButton
          onPress={onWeekly}
          isSelected={timeRange === 'weekly'}
        >
          주간
        </S.TimeRangeButton>
      </Group.Item>
      <S.Separator />
      <Group.Item>
        <S.TimeRangeButton
          onPress={onMonthly}
          isSelected={timeRange === 'monthly'}
        >
          월간
        </S.TimeRangeButton>
      </Group.Item>
    </S.XGroupBox>
  );
};
