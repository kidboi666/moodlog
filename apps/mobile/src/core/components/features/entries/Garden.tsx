import { memo, useMemo } from 'react'

import { Grass } from '@/core/components/features/entries/Grass'
import type { ISODateString, ISOMonthString } from '@/types/date.types'
import type { Mood } from '@/types/mood.types'
import * as S from './Garden.styled'

interface Props {
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
  getMoodForDate: (date: ISODateString) => Mood[]
}

export const Garden = memo(
  ({
    weekLength,
    monthDate,
    firstDateDay,
    lastDate,
    getMoodForDate,
  }: Props) => {
    const moodData = useMemo(() => {
      const data = []

      for (let week = 0; week < weekLength; week++) {
        const weekData = []
        for (let day = 0; day < 7; day++) {
          const dateNum = week * 7 + day - firstDateDay + 1
          if (dateNum <= 0 || dateNum > lastDate) {
            weekData.push(null)
          } else {
            const dateString =
              `${monthDate}-${dateNum.toString().padStart(2, '0')}` as ISODateString
            weekData.push(getMoodForDate(dateString))
          }
        }
        data.push(weekData)
      }

      return data
    }, [weekLength, firstDateDay, lastDate, getMoodForDate, monthDate])
    return (
      <S.GardenContainer>
        {moodData.map((week, weekIndex) => (
          <S.YStackContainer key={`${weekIndex}-${week}`}>
            {week.map((moods, dayIndex) => (
              <Grass
                key={`${dayIndex}-${moods}`}
                mood={moods}
                isEmpty={moods === null}
              />
            ))}
          </S.YStackContainer>
        ))}
      </S.GardenContainer>
    )
  },
)
