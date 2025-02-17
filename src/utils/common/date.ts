import { ISODateString } from '@/types/dtos/date';
import { WEEK_DAY } from '@/constants/date';

export const formatDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const date = value.getDate().toString().padStart(2, '0');
  const day = value.getDay();
  return { year, month, date, day };
};

export const transformISODate = (time: number) => {
  return new Date(time).toISOString().split('T')[0];
};

export const getWeekNumberInMonth = (date = new Date()) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDayOfMonth.getDay() + 1) / 7);
};

export const getMonthKey = (year: number, month: number) => {
  return `${year}-${String(month).padStart(2, '0')}`;
};

export const getDayInISODateString = (date: ISODateString) => {
  return Object.values(WEEK_DAY)[new Date(date).getDay()];
};

export const getDateInISODateString = (date: ISODateString) => {
  return date.split('-')[2];
};
