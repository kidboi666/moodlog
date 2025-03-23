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
import { journalReducer } from '@/core/store/reducers/journal.reducer';
import { JournalService } from '@/core/store/services/journal.service';
import {
  JournalActionContextType,
  JournalBaseContextType,
  JournalDataContextType,
  JournalState,
} from '@/core/store/types/journal.types';
import { StatusState } from '@/core/store/types/state.types';
import { statusReducer } from '@/core/store/reducers/status.reducer';

import { Draft } from '@/types/draft.types';

const initialState: JournalState = {
  journals: {},
  indexes: {
    byMonth: {},
    byDate: {},
  },
};

export const JournalBaseContext =
  createContext<Nullable<JournalBaseContextType>>(null);
export const JournalDataContext =
  createContext<Nullable<JournalDataContextType>>(null);
export const JournalActionContext =
  createContext<Nullable<JournalActionContextType>>(null);
export const JournalStatusContext = createContext<Nullable<StatusState>>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(journalReducer, initialState);
  const [status, setStatus] = useReducer(statusReducer, {
    isLoading: false,
    error: null,
  });

  const addJournal = useCallback(
    async (draft: Draft) => {
      try {
        setStatus({ type: 'SET_IS_LOADING', payload: true });
        const newJournals = await JournalService.addJournal(
          state.journals,
          state.indexes,
          draft,
        );
        dispatch({ type: 'SET_STORE', payload: newJournals });
      } catch (err) {
        console.error('Failed to save journals :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [state.journals],
  );

  const removeJournal = useCallback(
    async (id: string) => {
      try {
        setStatus({ type: 'SET_IS_LOADING', payload: true });
        const newJournals = await JournalService.removeJournal(
          state.journals,
          id,
        );
        dispatch({ type: 'SET_JOURNALS', payload: newJournals });
      } catch (err) {
        console.error('Failed to remove journal :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [state.journals],
  );

  const handleSelectedJournalChange = useCallback(
    async (journalId: string) => {
      return JournalService.getJournalById(state.journals, journalId);
    },
    [state.journals],
  );

  const handleSelectedJournalsChange = useCallback(
    (date: ISODateString | ISOMonthString | null) => {
      const selectedJournals = JournalService.getJournals(state.journals, date);
      dispatch({ type: 'SET_SELECTED_JOURNALS', payload: selectedJournals });
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
    (date: ISODateString) => {
      return JournalService.getMoodForDate(state.journals, date);
    },
    [state.journals],
  );

  const getCountForMonth = useCallback(
    (year: number, month: number | string) => {
      return JournalService.getCountForMonth(state.journals, year, month);
    },
    [state.journals],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const newJournals = await JournalService.loadJournals();
        dispatch({ type: 'SET_JOURNALS', payload: newJournals });
      } catch (err) {
        console.error('Failed to init journals :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    };

    void loadData();
  }, []);

  const journalBaseValue = useMemo(
    () => ({ journals: state.journals }),
    [state.journals],
  );

  const journalDataValue = useMemo(
    () => ({
      onSelectedJournalChange: handleSelectedJournalChange,
      onSelectedJournalsChange: handleSelectedJournalsChange,
    }),
    [handleSelectedJournalChange, handleSelectedJournalsChange],
  );

  const journalActionValue = useMemo(
    () => ({
      addJournal,
      removeJournal,
      getCountForMonth,
      getCountForDate,
      getMoodForDate,
    }),
    [
      addJournal,
      removeJournal,
      getCountForMonth,
      getCountForDate,
      getMoodForDate,
    ],
  );

  const journalStatusValue = useMemo(
    () => ({
      isLoading: status.isLoading,
      error: status.error,
    }),
    [status.isLoading, status.error],
  );

  return (
    <JournalBaseContext.Provider value={journalBaseValue}>
      <JournalDataContext.Provider value={journalDataValue}>
        <JournalActionContext.Provider value={journalActionValue}>
          <JournalStatusContext.Provider value={journalStatusValue}>
            {children}
          </JournalStatusContext.Provider>
        </JournalActionContext.Provider>
      </JournalDataContext.Provider>
    </JournalBaseContext.Provider>
  );
};

export const useJournal = () => {
  const journalBase = useContext(JournalBaseContext);
  const journalData = useContext(JournalDataContext);
  const journalAction = useContext(JournalActionContext);
  const journalStatus = useContext(JournalStatusContext);

  if (!journalBase || !journalData || !journalAction || !journalStatus) {
    throw new Error('useJournal must be used within a JournalContextProvider');
  }
  return {
    ...journalBase,
    ...journalData,
    ...journalAction,
    ...journalStatus,
  };
};
