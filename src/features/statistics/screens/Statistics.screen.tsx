import { H1, ScrollView } from 'tamagui';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { CARD_DELAY } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { TimeRangeZone } from '@/features/statistics/components/TimeRangeZone';
import * as S from './Statistics.styled';
import { TotalCount } from '@/features/statistics/components/total-count/TotalCount';
import { MoodAverage } from '@/features/statistics/components/mood-average/MoodAverage';
import { TimeRange } from '@/types/statistic.types';
import { useCalendar } from '@/core/hooks/useCalendar';
import { getISOMonthString } from '@/core/utils/date';

export const StatisticsScreen = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.YEARLY);
  const { selectedYear, selectedMonth, currentYear, currentMonth } =
    useCalendar();
  const { t } = useTranslation();

  const switchToMonthly = useCallback(() => {
    setTimeRange(TimeRange.MONTHLY);
  }, []);

  const switchToWeekly = useCallback(() => {
    setTimeRange(TimeRange.YEARLY);
  }, []);

  return (
    <ScrollView>
      <S.CardContainer edges={['top', 'bottom']} padded>
        <S.OrderBox>
          <H1>{t('statistics.title')}</H1>
          <TimeRangeZone
            timeRange={timeRange}
            onWeekly={switchToWeekly}
            onMonthly={switchToMonthly}
          />
        </S.OrderBox>
        <FadeIn delay={CARD_DELAY.FIRST}>
          <S.YStackContainer>
            <S.XStackContainer>
              <TotalCount
                timeRange={timeRange}
                selectedYear={selectedYear}
                selectedMonth={
                  selectedMonth || getISOMonthString(currentYear, currentMonth)
                }
              />
              <MoodAverage
                timeRange={timeRange}
                selectedYear={selectedYear}
                selectedMonth={
                  selectedMonth || getISOMonthString(currentYear, currentMonth)
                }
              />
            </S.XStackContainer>
          </S.YStackContainer>
        </FadeIn>
      </S.CardContainer>
    </ScrollView>
  );
};
