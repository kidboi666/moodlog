import { H3, Text } from 'tamagui';
import { useStatistics } from '@/core/store/hooks/useStatistics';
import { ProgressGraph } from '@/features/statistics/components/emotion-average/ProgressGraph';
import { EmotionType } from '@/core/types/enums';
import { Minimize2 } from '@tamagui/lucide-icons';
import * as S from './ExpandedContent.styled';
import { useTranslation } from 'react-i18next';

export const ExpandedContent = () => {
  const { emotionStats } = useStatistics();
  const { t } = useTranslation();

  const { scoreBoard } = emotionStats;
  let emotionTotalScore = 0;

  Object.values(scoreBoard).forEach(scoreCount => {
    emotionTotalScore += scoreCount.score;
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
              emotionType={type as EmotionType}
              emotionScore={Math.round(
                (countScore.score / emotionTotalScore) * 100,
              )}
            />
          ))}
        </S.MoodGraphBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.YStackContainer>
    </S.ViewContainer>
  );
};
