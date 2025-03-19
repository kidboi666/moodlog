import { Grass } from '@/features/entries/components/Grass';
import { getMonthNumber } from '@/core/utils/common';
import { Emotion } from '@/core/types/entries';
import { MonthKey } from '@/core/types/utils';
import { memo, useMemo } from 'react';
import * as S from './Garden.styled';

interface Props {
  weekLength: number;
  monthKey: MonthKey;
  firstDateDay: number;
  selectedYear: number;
  lastDate: number;
  getEmotionForDate: (year: number, month: number, date: number) => Emotion[];
}

export const Garden = memo(
  ({
    weekLength,
    monthKey,
    firstDateDay,
    selectedYear,
    lastDate,
    getEmotionForDate,
  }: Props) => {
    const emotionsData = useMemo(() => {
      const data = [];
      for (let week = 0; week < weekLength; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
          const dateNum = week * 7 + day - firstDateDay + 1;
          if (dateNum <= 0 || dateNum > lastDate) {
            weekData.push(null);
          } else {
            weekData.push(
              getEmotionForDate(
                selectedYear,
                getMonthNumber(monthKey),
                dateNum,
              ),
            );
          }
        }
        data.push(weekData);
      }
      return data;
    }, [
      weekLength,
      monthKey,
      firstDateDay,
      selectedYear,
      lastDate,
      getEmotionForDate,
    ]);

    return (
      <S.GardenContainer>
        {emotionsData.map((week, weekIndex) => (
          <S.YStackContainer key={weekIndex}>
            {week.map((emotions, dayIndex) => (
              <Grass
                key={dayIndex}
                emotions={emotions}
                isEmpty={emotions === null}
              />
            ))}
          </S.YStackContainer>
        ))}
      </S.GardenContainer>
    );
  },
);
