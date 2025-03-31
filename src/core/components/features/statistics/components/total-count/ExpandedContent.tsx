import { useTranslation } from 'react-i18next';
import { Minimize2 } from '@tamagui/lucide-icons';
import { EmptyContent } from '@/core/components/features/statistics/components/EmptyContent';
import { getMonthKey } from '@/utils/date';
import * as S from './ExpandedContent.styled';
import { memo } from 'react';

import { ExpressiveMonthStats } from '@/types/statistic.types';

interface Props {
  frequency: number;
  activeDay: string;
  totalCount: number;
  daysSinceSignup: number;
  expressiveMonth: ExpressiveMonthStats;
}

export const ExpandedContent = memo(
  ({
    frequency,
    activeDay,
    totalCount,
    daysSinceSignup,
    expressiveMonth,
  }: Props) => {
    const { t } = useTranslation();
    if (!totalCount) {
      return <EmptyContent />;
    }

    return (
      <S.ViewContainer>
        <S.DaysSinceSignupBox>
          <S.DaysSinceSignupTitle>
            {t('statistics.totalCount.daysSinceSignup.title')}
          </S.DaysSinceSignupTitle>
          <S.DaysSinceSignupDescription>
            {t('statistics.totalCount.daysSinceSignup.description', {
              date: daysSinceSignup,
            })}
          </S.DaysSinceSignupDescription>
        </S.DaysSinceSignupBox>
        <S.FrequencyBox>
          <S.FrequencyTitle>
            {t('statistics.totalCount.frequency.title')}
          </S.FrequencyTitle>
          <S.FrequencyDescription>
            {frequency === 0
              ? t('statistics.totalCount.frequency.everyDay')
              : t('statistics.totalCount.frequency.description', {
                  date: frequency,
                })}
          </S.FrequencyDescription>
        </S.FrequencyBox>
        <S.MostDayBox>
          <S.MostDayTitle>
            {t('statistics.totalCount.mostDay.title')}
          </S.MostDayTitle>
          <S.MostDayDescription>
            {t('statistics.totalCount.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
            })}
          </S.MostDayDescription>
        </S.MostDayBox>
        <S.ExpressiveMonthBox>
          <S.ExpressiveMonthTitle>
            {t('statistics.totalCount.expressiveMonth.title')}
          </S.ExpressiveMonthTitle>
          <S.ExpressiveMonthDescription>
            {t('statistics.totalCount.expressiveMonth.description', {
              month: t(`calendar.months.${getMonthKey(expressiveMonth.month)}`),
              count: expressiveMonth.count,
            })}
          </S.ExpressiveMonthDescription>
        </S.ExpressiveMonthBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.ViewContainer>
    );
  },
);
