import { HeaderContainer } from '@/core/components/HeaderContainer.styleable';
import * as S from './HomeHeader.styled';
import { memo } from 'react';

export const HomeHeader = memo(() => {
  return (
    <HeaderContainer>
      <S.RestBox />
    </HeaderContainer>
  );
});
