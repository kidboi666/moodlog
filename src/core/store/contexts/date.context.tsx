import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { CalendarUtils } from 'react-native-calendars';
import { ISODateString, ISOMonthString } from '@/types/date.types';
import { dateReducer } from '@/core/store/reducers/date.reducer';
import { DateStore } from '@/core/store/types/date.types';

export const DateContext = createContext<Nullable<DateStore>>(null);

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  const currentDate = useMemo(() => new Date(), []);
  const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
  const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);
  const initialISODate = useMemo(
    () => CalendarUtils.getCalendarDateString(currentDate),
    [currentDate],
  );

  const initialState = useMemo(
    () => ({
      selectedYear: currentYear,
      selectedMonth: null,
      selectedDate: initialISODate,
    }),
    [currentYear, initialISODate],
  );

  const [state, dispatch] = useReducer(dateReducer, initialState);

  const handleSelectedYearChange = useCallback((year: number) => {
    dispatch({ type: 'SET_SELECTED_YEAR', payload: year });
  }, []);

  const handleSelectedMonthChange = useCallback(
    (month: Nullable<ISOMonthString>) => {
      dispatch({ type: 'SET_SELECTED_MONTH', payload: month });
    },
    [],
  );

  const handleSelectedDateChange = useCallback((date: ISODateString) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  }, []);

  const initSelectedDates = useCallback(() => {
    dispatch({
      type: 'INIT_SELECTED_DATES',
      payload: { currentYear, currentMonth, initialISODate },
    });
  }, [currentYear, currentMonth, initialISODate]);

  const contextValue = useMemo(
    () => ({
      currentMonth,
      currentYear,
      currentDate,
      selectedYear: state.selectedYear,
      selectedMonth: state.selectedMonth,
      selectedDate: state.selectedDate,
      initSelectedDates,
      onSelectedYearChange: handleSelectedYearChange,
      onSelectedMonthChange: handleSelectedMonthChange,
      onSelectedDateChange: handleSelectedDateChange,
    }),
    [
      currentMonth,
      currentYear,
      currentDate,
      state.selectedYear,
      state.selectedMonth,
      state.selectedDate,
      initSelectedDates,
      handleSelectedYearChange,
      handleSelectedMonthChange,
      handleSelectedDateChange,
    ],
  );

  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateContextProvider');
  }
  return context;
};
