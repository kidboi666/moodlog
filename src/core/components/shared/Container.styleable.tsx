import { ScrollViewProps, ViewProps } from 'tamagui';
import { CONTAINER_MARGIN_TOP } from '@/core/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import * as S from './Container.styled';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';

const AnimatedViewContainer = Animated.createAnimatedComponent(S.ViewContainer);
const AnimatedScrollViewContainer = Animated.createAnimatedComponent(
  S.ScrollViewContainer,
);

interface ViewContainerProps extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
  Header?: ReactNode;
  padded?: boolean;
}

const ViewContainer = S.ViewContainer.styleable<ViewContainerProps>(
  ({ children, Header, padded, edges, ...props }, ref) => {
    const insets = useSafeAreaInsets();

    return (
      <AnimatedViewContainer
        ref={ref}
        padded={padded}
        topEdge={edges?.includes('top') ? insets.top + CONTAINER_MARGIN_TOP : 0}
        bottomEdge={edges?.includes('bottom') ? insets.bottom : 0}
        entering={FadeIn.duration(500).easing(Easing.quad)}
        {...props}
      >
        {Header && Header}
        {children}
      </AnimatedViewContainer>
    );
  },
);

ViewContainer.displayName = 'ViewContainer';

interface ScrollViewContainerProps extends ScrollViewProps {
  edges?: Array<'top' | 'bottom'>;
  Header?: ReactNode;
  padded?: boolean;
}

const ScrollViewContainer =
  S.ScrollViewContainer.styleable<ScrollViewContainerProps>(
    ({ children, Header, padded, edges, ...props }, ref) => {
      const insets = useSafeAreaInsets();

      return (
        <AnimatedScrollViewContainer
          ref={ref}
          padded={padded}
          topEdge={
            edges?.includes('top') ? insets.top + CONTAINER_MARGIN_TOP : 0
          }
          bottomEdge={edges?.includes('bottom') ? insets.bottom : 0}
          entering={FadeIn.duration(500).easing(Easing.quad)}
          {...props}
        >
          {Header && Header}
          {children}
        </AnimatedScrollViewContainer>
      );
    },
  );

ScrollViewContainer.displayName = 'ScrollViewContainer';

export const Container = {
  View: ViewContainer,
  ScrollView: ScrollViewContainer,
};
