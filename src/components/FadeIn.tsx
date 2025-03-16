import { useFadeIn } from '@/hooks/useFadeIn';
import { ViewProps } from 'tamagui';
import * as S from './FadeIn.styled';

interface Props extends ViewProps {
  delay?: number;
}

export const FadeIn = S.FadeInContainer.styleable<Props>(
  ({ delay = 1000, children, ...props }, ref) => {
    const { isVisible, item } = useFadeIn({ delay, item: children });

    return (
      <S.FadeInContainer ref={ref} isVisible={isVisible} {...props}>
        {item}
      </S.FadeInContainer>
    );
  },
);
