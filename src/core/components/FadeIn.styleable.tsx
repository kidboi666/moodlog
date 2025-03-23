import { useFadeIn } from '@/core/hooks/useFadeIn';
import { ViewProps } from 'tamagui';
import * as S from './FadeIn.styled';
import { memo } from 'react';

interface Props extends ViewProps {
  delay?: number;
}

const StyledFadeIn = S.FadeInContainer.styleable<Props>(
  ({ delay = 1000, children, ...props }, ref) => {
    const { isVisible, item } = useFadeIn({ delay, item: children });

    return (
      <S.FadeInContainer ref={ref} isVisible={isVisible} {...props}>
        {item}
      </S.FadeInContainer>
    );
  },
);

export const FadeIn = memo(StyledFadeIn);

FadeIn.displayName = 'FadeIn';
