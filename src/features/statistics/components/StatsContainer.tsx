import { useStatistics } from '@/core/store/hooks/useStatistics';
import { MoodAverage } from '@/features/statistics/components/mood-average/MoodAverage';
import { TotalCount } from '@/features/statistics/components/total-count/TotalCount';
import { useUser } from '@/core/store/hooks/useUser';
import * as S from './StatsContainer.styled';

export const StatsContainer = () => {
  const { journalStats, moodStats, expressiveMonthStats } = useStatistics();
  const { userInfo } = useUser();
  const { signatureMood } = moodStats ?? null;
  const { daysSinceSignup } = userInfo ?? null;

  return (
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
  );
};
