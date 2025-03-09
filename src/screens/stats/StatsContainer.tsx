import { useStatistics } from '@/store/hooks/useStatistics';
import { EmotionAverage } from '@/screens/stats/emotion-average/EmotionAverage';
import { TotalCount } from '@/screens/stats/total-count/TotalCount';
import { useUser } from '@/store/hooks/useUser';
import * as S from './StatsContainer.styled';

export const StatsContainer = () => {
  const { journalStats, emotionStats, expressiveMonthStats } = useStatistics();
  const { userInfo } = useUser();
  const { signatureEmotion } = emotionStats ?? null;
  const { daysSinceSignup } = userInfo ?? null;

  return (
    <S.YStackContainer>
      <S.XStackContainer>
        <TotalCount
          expressiveMonthStats={expressiveMonthStats}
          daysSinceSignup={daysSinceSignup}
          journalStats={journalStats}
        />
        <EmotionAverage signatureEmotion={signatureEmotion} />
      </S.XStackContainer>
    </S.YStackContainer>
  );
};
