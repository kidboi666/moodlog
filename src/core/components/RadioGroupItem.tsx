import * as S from './RadioGroupItem.styled';

interface Props {
  value: string;
  label: string;
  onValueChange: (value: string) => void;
}

export const RadioGroupItem = ({ value, label, onValueChange }: Props) => {
  return (
    <S.RadioGroupContainerButton onPress={() => onValueChange(value)}>
      <S.ContentContainer>
        <S.RadioItemLabel>{label}</S.RadioItemLabel>
        <S.StyledRadioGroupItem value={value} id={value}>
          <S.StyledRadioGroupIndicator />
        </S.StyledRadioGroupItem>
      </S.ContentContainer>
    </S.RadioGroupContainerButton>
  );
};
