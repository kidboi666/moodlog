import { StatsContainer } from '@/screens/stats/StatsContainer';
import { ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { CurrentMonth } from '@/screens/stats/selected-month/CurrentMonth';
import { FadeIn } from '@/components/FadeIn';
import { CARD_DELAY } from '@/constants/time';
import * as S from '@/styles/record/Record.styled';

export default function RecordScreen() {
  const { onScroll } = useScroll();

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
      <S.CardContainer edges={['top', 'bottom']} padded>
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
