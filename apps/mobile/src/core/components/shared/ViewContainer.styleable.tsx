import type { ReactNode } from 'react'
import type { ViewProps } from 'tamagui'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  CONTAINER_MARGIN_TOP,
  CONTAINER_VERTICAL_PADDING,
} from '@/core/constants/size'

import * as S from './ViewContainer.styled'

interface ViewContainerProps extends ViewProps {
  edges?: Array<'top' | 'bottom'>
  Header?: ReactNode
  padded?: boolean
}

export const ViewContainer = S.ViewContainer.styleable<ViewContainerProps>(
  ({ children, Header, padded, edges, ...props }, ref) => {
    const insets = useSafeAreaInsets()

    return (
      <S.ViewContainer
        padded={padded}
        topEdge={edges?.includes('top') ? insets.top + CONTAINER_MARGIN_TOP : 0}
        bottomEdge={
          edges?.includes('bottom')
            ? insets.bottom + CONTAINER_VERTICAL_PADDING
            : 0
        }
        ref={ref}
        {...props}
      >
        {Header && Header}
        {children}
      </S.ViewContainer>
    )
  },
)

ViewContainer.displayName = 'ViewContainer'
