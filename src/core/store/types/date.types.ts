import { Nullable } from '@/types/utill.types';
import { ISODateString, ISOMonthString } from '@/types/date.types';

export type DateAction =
  | { type: 'SET_SELECTED_YEAR'; payload: number }
  | { type: 'SET_SELECTED_MONTH'; payload: Nullable<ISOMonthString> }
  | { type: 'SET_SELECTED_DATE'; payload: ISODateString }
  | {
      type: 'INIT_SELECTED_DATES';
      payload: {
        currentYear: number;
        currentMonth: number;
        initialISODate: ISODateString;
      };
    };

export type DateState = {
  selectedYear: number;
  selectedMonth: Nullable<ISOMonthString>;
  selectedDate: ISODateString;
};

export interface DateStore {
  selectedYear: number;
  selectedMonth: Nullable<ISOMonthString>;
  selectedDate: ISODateString;
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  onSelectedYearChange: (year: number) => void;
  onSelectedMonthChange: (month: Nullable<ISOMonthString>) => void;
  onSelectedDateChange: (date: ISODateString) => void;
  initSelectedDates: () => void;
}
