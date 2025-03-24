import { getISOMonthString } from '@/core/utils/common';
import { DateAction, DateState } from '@/core/store/types/date.types';

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
        selectedMonth: getISOMonthString(currentYear, currentMonth),
        selectedDate: initialISODate,
      };
    }
    default:
      return state;
  }
};
