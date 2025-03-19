import { ViewProps } from 'tamagui';
import { CONTAINER_MARGIN_TOP } from '@/core/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import * as S from './Container.styled';

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
  Header?: ReactNode;
  padded?: boolean;
}
export const Container = S.Container.styleable<Props>(
  ({ children, Header, padded, edges, ...props }, ref) => {
    const insets = useSafeAreaInsets();

    return (
      <S.Container
        ref={ref}
        padded={padded}
        topEdge={edges?.includes('top') ? insets.top + CONTAINER_MARGIN_TOP : 0}
        bottomEdge={edges?.includes('bottom') ? insets.bottom : 0}
        {...props}
      >
        {Header && Header}
        {children}
      </S.Container>
    );
  },
);

Container.displayName = 'Container';
