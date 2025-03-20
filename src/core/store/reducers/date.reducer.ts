import { Nullable } from '@/types/common.types';
import { ISODateString, ISOMonthString } from '@/types/date.types';
import { getMonthInISODateString } from '@/core/utils/common';

type DateAction =
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

export const dateReducer = (
  state: DateState,
  action: DateAction,
): DateState => {
  switch (action.type) {
    case 'SET_SELECTED_YEAR':
      return { ...state, selectedYear: action.payload };
    case 'SET_SELECTED_MONTH':
      return { ...state, selectedMonth: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    case 'INIT_SELECTED_DATES': {
      const { currentYear, currentMonth, initialISODate } = action.payload;
      return {
        selectedYear: currentYear,
        selectedMonth: getMonthInISODateString(currentYear, currentMonth),
        selectedDate: initialISODate,
      };
    }
    default:
      return state;
  }
};
