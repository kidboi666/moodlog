import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { DateStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { CalendarUtils } from 'react-native-calendars';
import { getMonthInISODateString } from '@/core/utils/common';
import { ContextName } from '@/types/enums';

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

interface DateState {
  selectedYear: number;
  selectedMonth: Nullable<ISOMonthString>;
  selectedDate: ISODateString;
}

const dateReducer = (state: DateState, action: DateAction): DateState => {
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

export const CreateDateContext = (contextName: ContextName) => {
  const Context = createContext<Nullable<DateStore>>(null);

  Context.displayName = `${contextName}DateContext`;

  const Provider = ({ children }: PropsWithChildren) => {
    const currentDate = useMemo(() => new Date(), []);
    const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
    const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);
    const initialISODate = useMemo(
      () => CalendarUtils.getCalendarDateString(currentDate),
      [currentDate],
    );

    const initialState: DateState = useMemo(
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

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  return {
    Provider,
    Context,
  };
};

export const { Provider: EntriesDateProvider, Context: EntriesDateContext } =
  CreateDateContext('entries');
export const { Provider: WeekDateProvider, Context: WeekDateContext } =
  CreateDateContext('week');
export const {
  Provider: StatisticDateProvider,
  Context: StatisticDateContext,
} = CreateDateContext('statistic');
export const { Provider: GlobalDateProvider, Context: GlobalDateContext } =
  CreateDateContext('global');
