import { memo } from 'react';
import * as S from './MonthItem.styled';
import { ISODateString, ISOMonthString, MonthKey } from '@/types/date.types';
import { Mood } from '@/types/mood.types';
import { MonthItemContent } from '@/core/components/features/entries/components/MonthItemContent';

interface Props {
  monthData: {
    monthKey: MonthKey;
    lastDate: number;
    monthDate: ISOMonthString;
    firstDateDay: number;
    weekLength: number;
  };
  isSelected: boolean;
  onMonthChange: (monthDate: ISOMonthString) => void;
  getMoodForDate: (date: ISODateString) => Mood[];
}

export const MonthItem = memo(
  ({ monthData, isSelected, onMonthChange, getMoodForDate }: Props) => {
    const { monthKey, monthDate, lastDate, firstDateDay, weekLength } =
      monthData;
    return (
      <S.MonthItemButton
        key={monthKey}
        isSelected={isSelected}
        onPress={() => onMonthChange(monthDate)}
      >
        <MonthItemContent
          monthKey={monthKey}
          isSelected={isSelected}
          weekLength={weekLength}
          firstDateDay={firstDateDay}
          monthDate={monthDate}
          lastDate={lastDate}
          getMoodForDate={getMoodForDate}
        />
      </S.MonthItemButton>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.monthData.monthKey === nextProps.monthData.monthKey &&
      prevProps.monthData.monthDate === nextProps.monthData.monthDate &&
      prevProps.monthData.firstDateDay === nextProps.monthData.firstDateDay &&
      prevProps.monthData.weekLength === nextProps.monthData.weekLength &&
      prevProps.monthData.lastDate === nextProps.monthData.lastDate &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.getMoodForDate === nextProps.getMoodForDate &&
      prevProps.onMonthChange === nextProps.onMonthChange
    );
  },
);
