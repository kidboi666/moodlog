import { StatsContainer } from '@/screens/stats/StatsContainer';
import { H1, ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { CurrentMonth } from '@/screens/stats/selected-month/CurrentMonth';
import { FadeIn } from '@/components/FadeIn';
import { CARD_DELAY } from '@/constants/time';
import * as S from '@/styles/statistics/Statistics.styled';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { TimeRangeZone } from '@/screens/stats/TimeRangeZone';

export default function StatisticsScreen() {
  const { onScroll } = useScroll();
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  const { t } = useTranslation();

  const switchToMonthly = useCallback(() => {
    setTimeRange('monthly');
  }, [setTimeRange]);

  const switchToWeekly = useCallback(() => {
    setTimeRange('weekly');
  }, [setTimeRange]);

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
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
          <StatsContainer />
        </FadeIn>
        <FadeIn delay={CARD_DELAY.THIRD}>
          <CurrentMonth />
        </FadeIn>
      </S.CardContainer>
    </ScrollView>
  );
}
