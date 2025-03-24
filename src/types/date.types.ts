import { MONTHS, WEEK_DAY } from '@/core/constants/date';

export type DateCounts = {
  [date: ISODateString]: number;
};

export type ISODateString = `${number}-${number}-${number}`;

export type ISOMonthString = `${number}-${number}`;

export type WeekDayKey = keyof typeof WEEK_DAY;

export type WeekDayValue = (typeof WEEK_DAY)[WeekDayKey];

export type MonthKey = keyof typeof MONTHS;

export type MonthValue = (typeof MONTHS)[MonthKey];
