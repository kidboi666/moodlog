import { H3 } from 'tamagui';
import { EmotionType } from '@/types/enums';
import { emotionTheme } from '@/core/constants/themes';
import { useTranslation } from 'react-i18next';
import * as S from './ProgressGraph.styled';

interface Props {
  emotionScore: number;
  emotionType: EmotionType;
}

export const ProgressGraph = ({ emotionScore, emotionType }: Props) => {
  const { t } = useTranslation();

  return (
    <S.GraphContainer>
      <S.GraphNameBox>
        <H3>{t(`emotions.types.${emotionType}`)}</H3>
        <S.GraphName>{`${Math.floor(emotionScore)}%`}</S.GraphName>
      </S.GraphNameBox>
      <S.Progress value={emotionScore}>
        <S.ProgressIndicator moodColor={emotionTheme[emotionType].full} />
      </S.Progress>
    </S.GraphContainer>
  );
};
