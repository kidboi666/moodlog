import { StatsContainer } from '@/screens/stats/StatsContainer';
import { H1, ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { CurrentMonth } from '@/screens/stats/selected-month/CurrentMonth';
import { FadeIn } from '@/components/FadeIn';
import { CARD_DELAY } from '@/constants/time';
import * as S from '@/styles/record/Record.styled';
import { useTranslation } from 'react-i18next';

export default function StatisticsScreen() {
  const { onScroll } = useScroll();
  const { t } = useTranslation();

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
      <S.CardContainer edges={['top', 'bottom']} padded>
        <H1>{t('statistics.title')}</H1>
        <FadeIn delay={CARD_DELAY.FIRST}>
          <StatsContainer />
        </FadeIn>
        <FadeIn delay={CARD_DELAY.THIRD}>
          <CurrentMonth />
        </FadeIn>
      </S.CardContainer>
    </ScrollView>
  );
}
