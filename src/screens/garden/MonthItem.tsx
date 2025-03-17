import { MonthKey } from '@/types/utils';
import { YStack } from 'tamagui';
import { GardenMonthUnits } from '@/screens/garden/GardenMonthUnits';
import { Garden } from '@/screens/garden/Garden';
import { memo } from 'react';
import { Emotion } from '@/types/entries';
import * as S from './MonthItem.styled';

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
  getEmotionForDate: (year: number, month: number, date: number) => Emotion[];
}

export const MonthItem = memo(
  ({
    monthData,
    isSelected,
    onMonthChange,
    selectedYear,
    getEmotionForDate,
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
            getEmotionForDate={getEmotionForDate}
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
      prevProps.getEmotionForDate === nextProps.getEmotionForDate &&
      prevProps.onMonthChange === nextProps.onMonthChange
    );
  },
);
