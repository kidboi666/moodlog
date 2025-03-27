import { MONTHS, WEEK_DAY } from '@/core/constants/date';
import {
  ISODateString,
  ISOMonthString,
  MonthKey,
  WeekDayValue,
} from '@/types/date.types';
import { removeLeadingZero } from '@/core/utils/common';

/**
 * 월 숫자 또는 문자열을 입력받아 해당하는 월 문자열 키를 반환
 */
export const getMonthKey = (month: number | string) => {
  if (typeof month === 'number') {
    return Object.keys(MONTHS)[month] as MonthKey;
  } else if (month.includes('-')) {
    const monthNumber = Number(removeLeadingZero(month.split('-')[1])) - 1;
    return Object.keys(MONTHS)[monthNumber] as MonthKey;
  }

  return month as MonthKey;
};

/**
 * 년, 월, 일을 받아 ISODate(YYYY-MM-DD) 를 반환
 */
export const getISODateString = (
  year: number,
  month: number | string,
  date: number,
) => {
  let monthIndex: number;
  if (typeof month === 'string') {
    monthIndex = Object.keys(MONTHS).findIndex(key => key === month);
  } else {
    monthIndex = month;
  }
  return `${year}-${monthIndex.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` as ISODateString;
};

/**
 * ISODate(YYYY-MM-DD) 를 받아 요일 문자열 추출
 */
export const getDayFromISODate = (date: ISODateString): WeekDayValue => {
  return Object.keys(WEEK_DAY)[new Date(date).getDay()] as WeekDayValue;
};

/**
 * ISODate(YYYY-MM-DD) 를 받아 년도 추출
 */
export const getYearFromISODate = (date: ISODateString): number => {
  return parseInt(date.substring(0, 3));
};

/**
 * ISODate(YYYY-MM-DD) 를 받아 요일 인덱스 추출
 */
export const getDayIndexFromISODate = (date: ISODateString): number => {
  return new Date(date).getDay();
};

/**
 * ISODate(YYYY-MM-DD) 를 받아 날짜(일) 추출
 */
export const getDateFromISODate = (date: ISODateString): number => {
  return removeLeadingZero(date.split('-')[2]);
};

/**
 * ISODate(YYYY-MM-DD) 를 받아 ISOMonth(YYYY-MM) 를 반환
 */
export const getISOMonthString = (
  yearOrDate: number | ISODateString,
  month?: number | MonthKey,
): ISOMonthString => {
  if (typeof yearOrDate !== 'number') {
    return yearOrDate.substring(0, 7) as ISOMonthString;
  }

  let monthIndex: number;

  if (month && typeof month === 'number') {
    monthIndex = month;
  } else if (month && typeof month === 'string') {
    monthIndex = Object.keys(MONTHS).indexOf(month);
  } else {
    throw new Error('Invalid date format for year or month');
  }

  return `${yearOrDate}-${monthIndex.toString().padStart(2, '0')}` as ISOMonthString;
};

/**
 * 특정 월의 마지막 날짜(일) 반환
 */
export const getLastDate = (year: number, month: number | string): number => {
  if (typeof month === 'number') {
    return new Date(year, month + 1, 0).getDate();
  }
  return new Date(year, Object.keys(MONTHS).indexOf(month) + 1, 0).getDate();
};

/**
 * 특정 월의 1일의 요일의 인덱스 반환
 */
export const getFirstDateDay = (year: number, month: string): number => {
  return new Date(year, Object.keys(MONTHS).indexOf(month), 1).getDay();
};

/**
 * 특정 월의 주 수 반환
 */
export const getWeekLength = (year: number, month: any): number => {
  const lastDate = getLastDate(year, month);
  const firstDateDay = getFirstDateDay(year, month);
  return Math.ceil((lastDate + firstDateDay) / 7);
};

/**
 * 두 날짜 사이의 일수 계산
 */
export const getDaysBetweenDates = (startDate: string, endDate: string) => {
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  const diffTime: number = Math.abs(end.getTime() - start.getTime());

  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
