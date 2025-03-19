import React from 'react';
import * as S from './ArrowButton.styled';

interface Props {
  icon: any;
}

export const ArrowButton = ({ icon }: Props) => {
  return <S.StyledArrowButton icon={icon} />;
};
