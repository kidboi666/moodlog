import { H1, ScrollView } from 'tamagui';
import { useScroll } from '@/core/store/hooks/useScroll';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { CARD_DELAY } from '@/core/constants/time';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { TimeRangeZone } from '@/features/statistics/components/TimeRangeZone';
import * as S from './Statistics.styled';
import { TotalCount } from '@/features/statistics/components/total-count/TotalCount';
import { MoodAverage } from '@/features/statistics/components/mood-average/MoodAverage';
import { useStatistics } from '@/core/store/hooks/useStatistics';
import { useUser } from '@/core/store/hooks/useUser';

export const StatisticsScreen = () => {
  const { onScroll } = useScroll();
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  const { t } = useTranslation();
  const { journalStats, moodStats, expressiveMonthStats } = useStatistics();
  const { userInfo } = useUser();
  const { signatureMood } = moodStats ?? null;
  const { daysSinceSignup } = userInfo ?? null;

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
          <S.YStackContainer>
            <S.XStackContainer>
              <TotalCount
                expressiveMonthStats={expressiveMonthStats}
                daysSinceSignup={daysSinceSignup}
                journalStats={journalStats}
              />
              <MoodAverage signatureMood={signatureMood} />
            </S.XStackContainer>
          </S.YStackContainer>
        </FadeIn>
      </S.CardContainer>
    </ScrollView>
  );
};
