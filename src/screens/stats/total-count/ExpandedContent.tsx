import { useTranslation } from 'react-i18next';
import { Minimize2 } from '@tamagui/lucide-icons';
import { EmptyContent } from '@/screens/stats/EmptyContent';
import { ExpressiveMonthStats } from '@/types/entries';
import { getMonthStringWithoutYear } from '@/utils/common';
import * as S from './ExpandedContent.styled';
import { memo } from 'react';

interface Props {
  totalFrequency: number;
  totalActiveDay: string;
  totalCount: number;
  daysSinceSignup: number;
  expressiveMonthStats: ExpressiveMonthStats;
}

export const ExpandedContent = memo(
  ({
    totalFrequency,
    totalActiveDay,
    totalCount,
    daysSinceSignup,
    expressiveMonthStats,
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
            {totalFrequency === 0
              ? t('statistics.totalCount.frequency.everyDay')
              : t('statistics.totalCount.frequency.description', {
                  date: totalFrequency,
                })}
          </S.FrequencyDescription>
        </S.FrequencyBox>
        <S.MostDayBox>
          <S.MostDayTitle>
            {t('statistics.totalCount.mostDay.title')}
          </S.MostDayTitle>
          <S.MostDayDescription>
            {t('statistics.totalCount.mostDay.description', {
              day: t(`calendar.days.${totalActiveDay}`),
            })}
          </S.MostDayDescription>
        </S.MostDayBox>
        <S.ExpressiveMonthBox>
          <S.ExpressiveMonthTitle>
            {t('statistics.totalCount.expressiveMonth.title')}
          </S.ExpressiveMonthTitle>
          <S.ExpressiveMonthDescription>
            {t('statistics.totalCount.expressiveMonth.description', {
              month: t(
                `calendar.months.${getMonthStringWithoutYear(expressiveMonthStats.month)}`,
              ),
              count: expressiveMonthStats.count,
            })}
          </S.ExpressiveMonthDescription>
        </S.ExpressiveMonthBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.ViewContainer>
    );
  },
);
