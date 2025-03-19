import { YStack } from 'tamagui';
import { GardenMonthUnits } from '@/features/entries/components/GardenMonthUnits';
import { Garden } from '@/features/entries/components/Garden';
import { memo } from 'react';
import * as S from './MonthItem.styled';
import { MonthKey } from '@/types/date.types';
import { Mood } from '@/types/mood.types';

interface Props {
  monthData: {
    monthKey: MonthKey;
    lastDate: number;
    firstDateDay: number;
    weekLength: number;
  };
  isSelected: boolean;
  onMonthChange: (monthKey: MonthKey) => void;
  selectedYear: number;
  getMoodForDate: (year: number, month: number, date: number) => Mood[];
}

export const MonthItem = memo(
  ({
    monthData,
    isSelected,
    onMonthChange,
    selectedYear,
    getMoodForDate,
  }: Props) => {
    const { monthKey, lastDate, firstDateDay, weekLength } = monthData;
    return (
      <S.MonthItemButton
        key={monthKey}
        isSelected={isSelected}
        onPress={() => onMonthChange(monthKey)}
      >
        <YStack>
          <GardenMonthUnits month={monthKey} isSelected={isSelected} />
          <Garden
            weekLength={weekLength}
            monthKey={monthKey}
            firstDateDay={firstDateDay}
            selectedYear={selectedYear}
            lastDate={lastDate}
            getMoodForDate={getMoodForDate}
          />
        </YStack>
      </S.MonthItemButton>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.monthData.monthKey === nextProps.monthData.monthKey &&
      prevProps.monthData.firstDateDay === nextProps.monthData.firstDateDay &&
      prevProps.monthData.weekLength === nextProps.monthData.weekLength &&
      prevProps.monthData.lastDate === nextProps.monthData.lastDate &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.selectedYear === nextProps.selectedYear &&
      prevProps.getMoodForDate === nextProps.getMoodForDate &&
      prevProps.onMonthChange === nextProps.onMonthChange
    );
  },
);
