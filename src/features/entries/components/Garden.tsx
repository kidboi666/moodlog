import { Grass } from '@/features/entries/components/Grass';
import { getMonthNumber } from '@/core/utils/common';
import { memo, useMemo } from 'react';
import * as S from './Garden.styled';
import { MonthKey } from '@/core/types/date.types';
import { Mood } from '@/core/types/mood.types';

interface Props {
  weekLength: number;
  monthKey: MonthKey;
  firstDateDay: number;
  selectedYear: number;
  lastDate: number;
  getMoodForDate: (year: number, month: number, date: number) => Mood[];
}

export const Garden = memo(
  ({
    weekLength,
    monthKey,
    firstDateDay,
    selectedYear,
    lastDate,
    getMoodForDate,
  }: Props) => {
    const moodData = useMemo(() => {
      const data = [];
      for (let week = 0; week < weekLength; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
          const dateNum = week * 7 + day - firstDateDay + 1;
          if (dateNum <= 0 || dateNum > lastDate) {
            weekData.push(null);
          } else {
            weekData.push(
              getMoodForDate(selectedYear, getMonthNumber(monthKey), dateNum),
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
      getMoodForDate,
    ]);

    return (
      <S.GardenContainer>
        {moodData.map((week, weekIndex) => (
          <S.YStackContainer key={weekIndex}>
            {week.map((moods, dayIndex) => (
              <Grass key={dayIndex} mood={moods} isEmpty={moods === null} />
            ))}
          </S.YStackContainer>
        ))}
      </S.GardenContainer>
    );
  },
);
