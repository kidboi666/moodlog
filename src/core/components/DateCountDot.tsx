import { DateCounts } from '@/types/entries';
import * as S from './DateCountDot.styled';

interface Props {
  dateCounts?: DateCounts;
  dateString: string;
  isSelected?: boolean;
  variant?: 'default' | 'contained';
}

export const DateCountDot = ({
  dateCounts,
  dateString,
  isSelected,
  variant = 'default',
}: Props) => {
  if (!dateCounts) return null;
  return (
    <S.DotContainer>
      {Array.from({ length: dateCounts[dateString] }, (_, i) => {
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
