import { memo } from 'react';
import { ViewProps } from 'tamagui';

import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useFadeIn } from '@/core/hooks/useFadeIn';

import * as S from './FadeIn.styled';

interface Props extends ViewProps {
  delay?: number;
}

const StyledFadeIn = S.FadeInContainer.styleable<Props>(
  ({ delay = ANIMATION_DELAY_MS[0], children, ...props }, ref) => {
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
