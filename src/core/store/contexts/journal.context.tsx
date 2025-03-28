import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/utill.types';
import { ISODateString, ISOMonthString, MonthKey } from '@/types/date.types';
import { journalReducer } from '@/core/store/reducers/journal.reducer';
import { JournalService } from '@/core/services/journal.service';
import {
  JournalActionContextType,
  JournalDataContextType,
  JournalIndexes,
  JournalState,
  JournalStore,
} from '@/core/store/types/journal.types';
import { StatusState } from '@/core/store/types/state.types';
import { statusReducer } from '@/core/store/reducers/status.reducer';

import { Draft } from '@/types/journal.types';

const initialIndexes: JournalIndexes = {
  byMonth: {},
  byDate: {},
  byYear: {},
  byMood: {
    happy: [],
    sad: [],
    peace: [],
    angry: [],
  },
};
const initialStore: JournalStore = {
  journals: {},
  indexes: initialIndexes,
};

const initialState: JournalState = {
  store: initialStore,
  selectedJournals: null,
  selectedJournal: null,
};

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
        const newJournals = await JournalService.addJournal(state.store, draft);
        dispatch({ type: 'SET_STORE', payload: newJournals });
      } catch (err) {
        console.error('Failed to save journals :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [state.store],
  );

  const removeJournal = useCallback(
    async (id: string) => {
      try {
        setStatus({ type: 'SET_IS_LOADING', payload: true });
        const newStore = await JournalService.removeJournal(state.store, id);
        dispatch({ type: 'SET_STORE', payload: newStore });
      } catch (err) {
        console.error('Failed to remove journal :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [state.store],
  );

  const selectJournal = useCallback(
    async (journalId: string) => {
      try {
        setStatus({ type: 'SET_IS_LOADING', payload: true });
        const journal = JournalService.getJournalById(
          state.store.journals,
          journalId,
        );
        dispatch({ type: 'SET_SELECTED_JOURNAL', payload: journal });
      } catch (err) {
        console.error('Failed to select journal :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [state.store],
  );

  const selectJournals = useCallback(
    async (date: ISODateString | ISOMonthString | null) => {
      try {
        setStatus({ type: 'SET_IS_LOADING', payload: true });
        const journals = JournalService.getJournals(state.store, date);
        dispatch({ type: 'SET_SELECTED_JOURNALS', payload: journals });
      } catch (err) {
        console.error('Failed to select journals :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [state.store],
  );

  const getCountForDate = useCallback(
    (year: number, month: number | string, date: number) => {
      return JournalService.getCountForDate(
        state.store.indexes || initialIndexes,
        year,
        month,
        date,
      );
    },
    [state.store.indexes],
  );

  const getCountForMonth = useCallback(
    (year: number, month: number | MonthKey) => {
      return JournalService.getCountForMonth(
        state.store.indexes || initialIndexes,
        year,
        month,
      );
    },
    [state.store.indexes],
  );

  const getMoodForDate = useCallback(
    (date: ISODateString) => {
      return JournalService.getMoodForDate(state.store, date);
    },
    [state.store],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setStatus({ type: 'SET_IS_LOADING', payload: true });
        const newStore = await JournalService.loadJournalStore();
        const safeStore = {
          journals: newStore.journals || {},
          indexes: {
            byYear: newStore.indexes?.byYear || {},
            byMonth: newStore.indexes?.byMonth || {},
            byDate: newStore.indexes?.byDate || {},
            byMood: newStore.indexes?.byMood || {
              happy: [],
              sad: [],
              peace: [],
              angry: [],
            },
          },
        };

        dispatch({ type: 'SET_STORE', payload: safeStore });
      } catch (err) {
        console.error('Failed to init journals :', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      } finally {
        setStatus({ type: 'SET_IS_LOADING', payload: false });
      }
    };

    void loadData();
  }, []);

  const journalDataValue = useMemo(
    () => ({
      journals: state.store.journals,
      indexes: state.store.indexes,
      selectedJournals: state.selectedJournals,
      selectedJournal: state.selectedJournal,
    }),
    [
      state.store.journals,
      state.store.indexes,
      state.selectedJournals,
      state.selectedJournal,
    ],
  );

  const journalActionValue = useMemo(
    () => ({
      selectJournal,
      selectJournals,
      addJournal,
      removeJournal,
      getCountForMonth,
      getCountForDate,
      getMoodForDate,
    }),
    [
      selectJournal,
      selectJournals,
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
    <JournalDataContext.Provider value={journalDataValue}>
      <JournalActionContext.Provider value={journalActionValue}>
        <JournalStatusContext.Provider value={journalStatusValue}>
          {children}
        </JournalStatusContext.Provider>
      </JournalActionContext.Provider>
    </JournalDataContext.Provider>
  );
};

export const useJournal = () => {
  const journalData = useContext(JournalDataContext);
  const journalAction = useContext(JournalActionContext);
  const journalStatus = useContext(JournalStatusContext);

  if (!journalData || !journalAction || !journalStatus) {
    throw new Error('useJournal must be used within a JournalContextProvider');
  }
  return {
    ...journalData,
    ...journalAction,
    ...journalStatus,
  };
};
