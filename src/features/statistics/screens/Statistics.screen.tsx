import { H1, ScrollView } from 'tamagui';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { TimeRangeZone } from '@/features/statistics/components/TimeRangeZone';
import * as S from './Statistics.styled';
import { TotalCount } from '@/features/statistics/components/total-count/TotalCount';
import { MoodAverage } from '@/features/statistics/components/mood-average/MoodAverage';
import { TimeRange } from '@/types/statistic.types';
import { useCalendar } from '@/core/hooks/useCalendar';
import { ISOMonthString } from '@/types/date.types';
import { WeeklyMoodChart } from '@/features/statistics/components/WeeklyMoodChart';

export const StatisticsScreen = () => {
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
      <S.CardContainer edges={['top', 'bottom']} padded>
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
      </S.CardContainer>
    </ScrollView>
  );
};
