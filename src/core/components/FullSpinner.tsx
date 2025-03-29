import { Spinner } from 'tamagui';
import * as S from './FullSpinner.styled';

interface Props {
  size?: 'small' | 'large';
}
export const FullSpinner = ({ size = 'small' }: Props) => {
  return (
    <S.ViewContainer>
      <Spinner size={size} />
    </S.ViewContainer>
  );
};
