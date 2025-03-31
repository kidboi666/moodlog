import { H3, Text } from 'tamagui';
import { ProgressGraph } from '@/core/components/features/statistics/components/mood-average/ProgressGraph';
import { Minimize2 } from '@tamagui/lucide-icons';
import * as S from './ExpandedContent.styled';
import { useTranslation } from 'react-i18next';

import { MoodType } from '@/types/mood.types';
import { ScoreBoard } from '@/types/statistic.types';

interface Props {
  scoreBoard: ScoreBoard;
}

export const ExpandedContent = ({ scoreBoard }: Props) => {
  const { t } = useTranslation();

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
