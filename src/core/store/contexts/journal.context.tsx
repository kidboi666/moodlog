import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { ISODateString, ISOMonthString } from '@/types/date.types';
import { Draft, Journal } from '@/types/journal.types';
import { journalReducer } from '@/core/store/reducers/journal.reducer';
import { JournalService } from '@/core/store/services/journal.service';
import { JournalState, JournalStore } from '@/core/store/types/journal.types';

const initialState: JournalState = {
  journals: [],
  isSubmitted: false,
  yearlyJournals: [],
  monthlyJournals: [],
  dailyJournals: [],
  selectedJournal: null,
  isLoading: false,
  error: null,
};

export const JournalContext = createContext<Nullable<JournalStore>>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(journalReducer, initialState);

  const addJournal = useCallback(
    async (draft: Draft) => {
      try {
        const newJournals = await JournalService.addJournal(
          state.journals,
          draft,
        );
        dispatch({ type: 'SET_JOURNALS', payload: newJournals });
        dispatch({ type: 'SET_IS_SUBMITTED', payload: true });
      } catch (err) {
        console.error('save journals failed : ', err);
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.journals],
  );

  const updateJournals = useCallback(
    async (updatedJournal: Journal) => {
      try {
        const newJournals = await JournalService.updateJournal(
          state.journals,
          updatedJournal,
        );
        dispatch({ type: 'SET_JOURNALS', payload: newJournals });
      } catch (err) {
        console.error('update journals failed : ', err);
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.journals],
  );

  const removeJournal = useCallback(
    async (id: string) => {
      try {
        const newJournals = await JournalService.removeJournal(
          state.journals,
          id,
        );
        dispatch({ type: 'SET_JOURNALS', payload: newJournals });
      } catch (err) {
        console.error('remove journal failed : ', err);
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.journals],
  );

  const getCountForDate = useCallback(
    (year: number, month: number | string, date: number) => {
      return JournalService.getCountForDate(state.journals, year, month, date);
    },
    [state.journals],
  );

  const getMoodForDate = useCallback(
    (year: number, month: number, date: number) => {
      return JournalService.getMoodForDate(state.journals, year, month, date);
    },
    [state.journals],
  );

  const getCountForMonth = useCallback(
    (year: number, month: number | string) => {
      return JournalService.getCountForMonth(state.journals, year, month);
    },
    [state.journals],
  );

  const handleSelectedJournalChange = useCallback(
    async (journalId: string) => {
      const selectedJournal = JournalService.getJournalById(
        state.journals,
        journalId,
      );
      dispatch({ type: 'SET_SELECTED_JOURNAL', payload: selectedJournal });
    },
    [state.journals],
  );

  const handleDailyJournalsChange = useCallback(
    (date: ISODateString) => {
      const dailyJournals = JournalService.getJournalsByDate(
        state.journals,
        date,
      );
      dispatch({
        type: 'SET_DAILY_JOURNALS',
        payload: dailyJournals.length === 0 ? date : dailyJournals,
      });
    },
    [state.journals],
  );

  const handleMonthlyJournalsChange = useCallback(
    (monthDate: ISOMonthString) => {
      const selectedJournals = JournalService.getJournalsByMonth(
        state.journals,
        monthDate,
      );
      dispatch({ type: 'SET_MONTHLY_JOURNAL', payload: selectedJournals });
    },
    [state.journals],
  );

  const handleYearlyJournalsChange = useCallback(
    (year: number) => {
      const selectedJournals = state.journals.filter(journal =>
        journal.localDate.startsWith(year.toString()),
      );
      dispatch({ type: 'SET_YEARLY_JOURNAL', payload: selectedJournals });
    },
    [state.journals],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const newJournals = await JournalService.loadJournals();
        dispatch({ type: 'SET_JOURNALS', payload: newJournals });
      } catch (err) {
        console.error('load journals failed : ', err);
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    };

    void loadData();
  }, []);

  return (
    <JournalContext.Provider
      value={useMemo(
        () => ({
          journals: state.journals,
          dailyJournals: state.dailyJournals,
          selectedJournal: state.selectedJournal,
          monthlyJournals: state.monthlyJournals,
          yearlyJournals: state.yearlyJournals,
          isSubmitted: state.isSubmitted,
          isLoading: state.isLoading,
          error: state.error,
          addJournal,
          removeJournal,
          updateJournals,
          getCountForMonth,
          getCountForDate,
          getMoodForDate,
          onSelectedJournalChange: handleSelectedJournalChange,
          onDailyJournalsChange: handleDailyJournalsChange,
          onMonthlyJournalsChange: handleMonthlyJournalsChange,
          onYearlyJournalsChange: handleYearlyJournalsChange,
        }),
        [
          state.journals,
          state.dailyJournals,
          state.selectedJournal,
          state.monthlyJournals,
          state.yearlyJournals,
          state.isSubmitted,
          state.isLoading,
          state.error,
          addJournal,
          updateJournals,
          removeJournal,
          getCountForMonth,
          getCountForDate,
          getMoodForDate,
          handleSelectedJournalChange,
          handleDailyJournalsChange,
          handleMonthlyJournalsChange,
          handleYearlyJournalsChange,
        ],
      )}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);

  if (!context) {
    throw new Error('useJournal must be used within a JournalContextProvider');
  }
  return context;
};
