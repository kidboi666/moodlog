import { useTranslation } from 'react-i18next';
import { SelectedMonthStats } from '@/types/entries';
import { getEmotionTheme, getMonthStringWithoutYear } from '@/utils/common';
import { EmotionLevel, EmotionType } from '@/types/enums';
import * as S from './ExpandedContent.styled';
import { Minimize2 } from '@tamagui/lucide-icons';

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
    signatureEmotion,
  } = selectedMonthStats;

  const month = t(
    `calendar.months.${getMonthStringWithoutYear(ISOMonthString)}`,
  );

  return (
    <S.MonthlyStatsContainer>
      <S.EmotionSummaryHeader
        bg={getEmotionTheme(
          signatureEmotion.type as EmotionType,
          EmotionLevel.FULL,
        )}
      >
        <S.SignatureEmotionLabel>
          {t('statistics.stats.currentMonth.emotion', { month })}
        </S.SignatureEmotionLabel>
        <S.SignatureEmotionValue>
          {signatureEmotion
            ? t(`emotions.types.${signatureEmotion.type}`)
            : t('common.fallback.text')}
        </S.SignatureEmotionValue>
      </S.EmotionSummaryHeader>

      <S.StatsDetailContainer>
        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.stats.currentMonth.journalCount.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {t(`statistics.stats.currentMonth.journalCount.description`, {
              count,
            })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.stats.currentMonth.frequency.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {frequency === 0
              ? t('statistics.stats.currentMonth.frequency.everyDay', { month })
              : t('statistics.stats.currentMonth.frequency.description', {
                  date: frequency,
                  month,
                })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.stats.currentMonth.mostDay.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {t('statistics.stats.currentMonth.mostDay.description', {
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
