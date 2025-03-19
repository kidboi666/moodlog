import { useTranslation } from 'react-i18next';
import { getMonthStringWithoutYear, getMoodTheme } from '@/core/utils/common';
import * as S from './ExpandedContent.styled';
import { Minimize2 } from '@tamagui/lucide-icons';

import { SelectedMonthStats } from '@/core/types/statistic.types';
import { MoodLevel, MoodType } from '@/core/types/mood.types';

interface Props {
  selectedMonthStats: SelectedMonthStats;
}

export const ExpandedContent = ({ selectedMonthStats }: Props) => {
  const { t } = useTranslation();
  const {
    month: ISOMonthString,
    count,
    activeDay,
    frequency,
    signatureMood,
  } = selectedMonthStats;

  const month = t(
    `calendar.months.${getMonthStringWithoutYear(ISOMonthString)}`,
  );

  return (
    <S.MonthlyStatsContainer>
      <S.MoodSummaryHeader
        bg={getMoodTheme(signatureMood.type as MoodType, MoodLevel.FULL)}
      >
        <S.SignatureMoodLabel>
          {t('statistics.statistics.currentMonth.emotion', { month })}
        </S.SignatureMoodLabel>
        <S.SignatureMoodValue>
          {signatureMood
            ? t(`emotions.types.${signatureMood.type}`)
            : t('common.fallback.text')}
        </S.SignatureMoodValue>
      </S.MoodSummaryHeader>

      <S.StatsDetailContainer>
        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.statistics.currentMonth.journalCount.title', {
              month,
            })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {t(`statistics.stats.currentMonth.journalCount.description`, {
              count,
            })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.statistics.currentMonth.frequency.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {frequency === 0
              ? t('statistics.statistics.currentMonth.frequency.everyDay', {
                  month,
                })
              : t('statistics.statistics.currentMonth.frequency.description', {
                  date: frequency,
                  month,
                })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.statistics.currentMonth.mostDay.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {t('statistics.statistics.currentMonth.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
              month,
            })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.MinimizeButton icon={Minimize2} />
      </S.StatsDetailContainer>
    </S.MonthlyStatsContainer>
  );
};
