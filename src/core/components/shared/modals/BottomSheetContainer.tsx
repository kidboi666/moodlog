import * as S from './BottomSheetContainer.styled';
import { PropsWithChildren } from 'react';
import { ViewProps } from 'tamagui';

export const BottomSheetContainer = S.BottomSheetContainer.styleable<
  PropsWithChildren<ViewProps>
>(({ children, ...props }, ref) => {
  return (
    <S.BottomSheetContainer ref={ref} {...props}>
      {children}
    </S.BottomSheetContainer>
  );
});

BottomSheetContainer.displayName = 'BottomSheetContainer';
