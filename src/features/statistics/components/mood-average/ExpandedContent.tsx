import { H3, Text } from 'tamagui';
import { ProgressGraph } from '@/features/statistics/components/mood-average/ProgressGraph';
import { Minimize2 } from '@tamagui/lucide-icons';
import * as S from './ExpandedContent.styled';
import { useTranslation } from 'react-i18next';

import { MoodType } from '@/types/mood.types';
import { useStatistics } from '@/core/store/contexts/statistics.context';

export const ExpandedContent = () => {
  const { moodStats } = useStatistics();
  const { t } = useTranslation();

  const { scoreBoard } = moodStats;
  let moodTotalScore = 0;

  Object.values(scoreBoard).forEach(scoreCount => {
    moodTotalScore += scoreCount.score;
  });

  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.TitleBox>
          <H3>{t('statistics.mood.title')}</H3>
          <Text>{t('statistics.mood.description')}</Text>
        </S.TitleBox>
        <S.MoodGraphBox>
          {Object.entries(scoreBoard).map(([type, countScore], i) => (
            <ProgressGraph
              key={i}
              moodType={type as MoodType}
              moodScore={Math.round((countScore.score / moodTotalScore) * 100)}
            />
          ))}
        </S.MoodGraphBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.YStackContainer>
    </S.ViewContainer>
  );
};
