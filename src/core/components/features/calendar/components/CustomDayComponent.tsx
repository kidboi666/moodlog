import React, { memo } from 'react';
import { DateData } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { DateCountDot } from '@/core/components/features/home/components/DateCountDot';
import * as S from './CustomDayComponent.styled';
import { DateCounts } from '@/types/date.types';

interface Props {
  date: DateData;
  state: DayState;
  marking: MarkingProps;
  onPress: () => void;
  dateCounts?: DateCounts;
}

export const CustomDayComponent = memo(
  ({ date, state, marking, onPress, dateCounts }: Props) => {
    const { selected } = marking || {};
    const isSelected = selected;
    const isToday = state === 'today';
    const isDisabled = state === 'disabled';

    return (
      <S.DayContainerButton
        onPress={onPress}
        disabled={isDisabled}
        isSelected={isSelected}
        isDisabled={isDisabled}
        isToday={isToday}
      >
        <S.DotBox>
          <S.DayText isSelected={isSelected}>{date.day}</S.DayText>
          <DateCountDot
            dateCounts={dateCounts}
            dateString={date.dateString}
            isSelected={isSelected}
          />
        </S.DotBox>
      </S.DayContainerButton>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.date.dateString === nextProps.date.dateString &&
      prevProps.state === nextProps.state &&
      prevProps.marking === nextProps.marking &&
      prevProps.dateCounts === nextProps.dateCounts
    );
  },
);
