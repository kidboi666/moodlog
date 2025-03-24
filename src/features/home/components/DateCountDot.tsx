import * as S from './DateCountDot.styled';

interface Props {
  journalCount?: number;
  isSelected?: boolean;
  variant?: 'default' | 'contained';
}

export const DateCountDot = ({
  journalCount,
  isSelected,
  variant = 'default',
}: Props) => {
  if (!journalCount) return null;
  return (
    <S.DotContainer>
      {Array.from({ length: journalCount }, (_, i) => {
        if (i >= 3) return null;
        return (
          <S.Dot
            key={i}
            backgroundStyle={
              variant === 'contained'
                ? isSelected
                  ? '$gray12'
                  : '$gray1'
                : isSelected
                  ? '$gray1'
                  : '$gray12'
            }
          />
        );
      })}
    </S.DotContainer>
  );
};
