import React from 'react';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';

interface Props {
  isSelected: boolean;
  onRouteChange: () => void;
}

export const NextButton = ({ isSelected, onRouteChange }: Props) => {
  return (
    <S.AnimatedContainer>
      <S.NextButton
        icon={ArrowRight}
        disabled={!isSelected}
        onPress={onRouteChange}
      />
    </S.AnimatedContainer>
  );
};
