import React from 'react';
import { Check } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';

interface Props {
  isSelected: boolean;
  onRouteChange: () => void;
}

export const NextButton = ({ isSelected, onRouteChange }: Props) => {
  return (
    <S.AnimatedContainer>
      <S.NextButton
        icon={Check}
        disabled={!isSelected}
        onPress={onRouteChange}
      />
    </S.AnimatedContainer>
  );
};
