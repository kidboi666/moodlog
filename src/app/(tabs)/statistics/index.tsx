import { useCallback, useState } from 'react';
import { TimeRange } from '@/types/statistic.types';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useTranslation } from 'react-i18next';
import { ISOMonthString } from '@/types/date.types';
import * as S from '@/styles/screens/statistics/Statistics.styled';
import { H1, ScrollView } from 'tamagui';
import { TimeRangeZone } from '@/core/components/features/statistics/components/TimeRangeZone';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { TotalCount } from '@/core/components/features/statistics/components/total-count/TotalCount';
import { MoodAverage } from '@/core/components/features/statistics/components/mood-average/MoodAverage';
import { WeeklyMoodChart } from '@/core/components/features/statistics/components/WeeklyMoodChart';

export default function Screen() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.YEARLY);
  const { selectedYear, selectedMonth, todayString } = useCalendar();
  const { t } = useTranslation();

  const handleTimeRangeChange = useCallback((timeRange: TimeRange) => {
    setTimeRange(timeRange);
  }, []);

  const monthString = selectedMonth
    ? selectedMonth
    : (todayString.substring(0, 7) as ISOMonthString);

  return (
    <ScrollView>
      <S.ViewContainer edges={['top', 'bottom']} padded>
        <S.OrderBox>
          <H1>{t('statistics.title')}</H1>
          <TimeRangeZone
            timeRange={timeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        </S.OrderBox>
        <FadeIn delay={ANIMATION_DELAY_MS[0]}>
          <S.YStackContainer>
            <S.XStackContainer>
              <TotalCount
                timeRange={timeRange}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth || monthString}
              />
              <MoodAverage
                timeRange={timeRange}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth || monthString}
              />
            </S.XStackContainer>
            <WeeklyMoodChart selectedMonth={selectedMonth || monthString} />
          </S.YStackContainer>
        </FadeIn>
      </S.ViewContainer>
    </ScrollView>
  );
}
