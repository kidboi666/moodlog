import { MONTHS, WEEK_DAY } from '@/constants/date';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { emotionTheme } from '@/constants/themes';
import { MonthKey } from '@/types/utils';

/**
 * month에 +1 하는 규칙:
 * 1. ISODateString을 만들때
 * 2. 해당 달의 마지막날을 구할때 (getLastDate)
 */
export const removeLeadingZero = (str: string) => {
  str = String(str);

  if (str.charAt(0) === '0' && str.length > 1) {
    return str.substring(1);
  }

  return str;
};

export const getMonthNumber = (month: MonthKey) => {
  return Object.keys(MONTHS).indexOf(month);
};

export const getMonthString = (month: number) => {
  return Object.keys(MONTHS)[month];
};

export const getISODateString = (year: number, month: number, date: number) => {
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` as ISODateString;
};

export const getDayInISODateString = (date: ISODateString) => {
  return Object.keys(WEEK_DAY)[new Date(date).getDay()];
};

export const getDateInISODateString = (date: ISODateString) => {
  return removeLeadingZero(date.split('-')[2]);
};

export const getMonthInISODateString = (
  year: number,
  month: number | MonthKey,
) => {
  if (typeof month === 'number') {
    return `${year}-${(month + 1).toString().padStart(2, '0')}` as ISOMonthString;
  }
  return `${year}-${(Object.keys(MONTHS).indexOf(month) + 1)
    .toString()
    .padStart(2, '0')}` as ISOMonthString;
};

export const getLastDate = (year: number, month: number | MonthKey) => {
  if (typeof month === 'number') {
    return new Date(year, month + 1, 0).getDate();
  }
  return new Date(year, Object.keys(MONTHS).indexOf(month) + 1, 0).getDate();
};

export const getFirstDateDay = (year: number, month: string) => {
  return new Date(year, Object.keys(MONTHS).indexOf(month), 1).getDay();
};

export const getWeekLength = (year: number, month: any) => {
  const lastDate = getLastDate(year, month);
  const firstDateDay = getFirstDateDay(year, month);
  return Math.ceil((lastDate + firstDateDay) / 7);
};

export const getMonthStringWithoutYear = (str: string) => {
  return Object.keys(MONTHS)[
    Number(removeLeadingZero(str.split('-')[1])) - 1
  ] as MonthKey;
};

export const getEmotionTheme = (type: EmotionType, level: EmotionLevel) => {
  return emotionTheme[type][level];
};

export const toSingle = <T>(value: T | T[]): T => {
  return Array.isArray(value) ? value[0] : value;
};
