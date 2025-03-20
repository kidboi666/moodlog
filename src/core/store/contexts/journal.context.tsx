import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { MONTHS } from '@/core/constants/date';
import { getISODateString } from '@/core/utils/common';
import { JournalStore } from '@/core/store/types';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import { Draft, Journal } from '@/types/journal.types';
import { journalReducer } from '@/core/store/reducers/journal.reducer';
import { JournalService } from '@/core/services/journal.service';

const initialState = {
  journals: [],
  isSubmitted: false,
  yearlyJournals: [],
  monthlyJournals: [],
  dailyJournals: [],
  selectedJournal: null,
  isLoading: false,
};

export const JournalContext = createContext<Nullable<JournalStore>>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(journalReducer, initialState);

  const handleSelectedJournalChange = useCallback(async (journalId: string) => {
    dispatch({ type: 'SET_IS_LOADING', payload: true });
    const selectedJournal =
      state.journals.find(journal => journal.id === journalId) ?? null;
    dispatch({ type: 'SET_SELECTED_JOURNAL', payload: selectedJournal });
  }, []);

  const addJournal = useCallback(async (draft: Draft) => {
    const nextJournals = await JournalService.addJournal(state.journals, draft);
    dispatch({ type: 'SET_JOURNALS', payload: nextJournals });
    dispatch({ type: 'SET_IS_SUBMITTED', payload: true });
  }, []);

  const getDateCountsForDate = useCallback(
    (year: number, month: number | string, date: number) => {
      let intMonth: number;
      if (typeof month === 'string') {
        intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
      } else {
        intMonth = month;
      }

      const dateString = `${year}-${(intMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
      const foundJournals = state.journals.filter(
        journal => journal.localDate === dateString,
      );

      return foundJournals.length;
    },
    [state.journals],
  );

  const getMoodForDate = useCallback(
    (year: number, month: number, date: number) => {
      const dateString = getISODateString(year, month, date);
      const foundJournals = state.journals.filter(
        journal => journal.localDate === dateString,
      );

      return foundJournals.map(journal => journal.mood);
    },
    [state.journals],
  );

  const getDateCountsForMonth = useCallback(
    (year: number, month: number | string) => {
      let intMonth: number;

      if (typeof month === 'string') {
        intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
      } else {
        intMonth = month;
      }
      const lastDay = new Date(year, intMonth, 0).getDate();
      const counts: DateCounts = {};

      for (let day = 1; day <= lastDay; day++) {
        const dateKey = `${year}-${intMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        counts[dateKey] = 0;
      }

      state.journals.forEach(journal => {
        if (counts.hasOwnProperty(journal.localDate)) {
          counts[journal.localDate]++;
        }
      });

      return counts;
    },
    [state.journals],
  );

  const removeJournal = useCallback((id: string) => {
    const nextJournals = state.journals.filter(journal => journal.id !== id);
    dispatch({ type: 'SET_JOURNALS', payload: nextJournals });
  }, []);

  const updateJournals = useCallback(async (newJournal: Journal) => {
    const nextJournals = await JournalService.updateJournal(
      state.journals,
      newJournal,
    );
    dispatch({ type: 'SET_JOURNALS', payload: nextJournals });
  }, []);

  const getJournalsByDate = useCallback((date: ISODateString) => {
    const selectedJournals = state.journals.filter(
      journal => journal.localDate === date,
    );
    if (selectedJournals.length === 0) {
      dispatch({ type: 'SET_DAILY_JOURNALS', payload: date });
    } else {
      dispatch({ type: 'SET_DAILY_JOURNALS', payload: selectedJournals });
    }
  }, []);

  const getJournalsByMonth = useCallback((date: ISOMonthString) => {
    const selectedJournals = state.journals.filter(journal =>
      journal.localDate.startsWith(date),
    );
    dispatch({ type: 'SET_MONTHLY_JOURNAL', payload: selectedJournals });
  }, []);

  const getJournalsByYear = useCallback((year: number) => {
    const selectedJournals = state.journals.filter(journal =>
      journal.localDate.startsWith(year.toString()),
    );
    dispatch({ type: 'SET_YEARLY_JOURNAL', payload: selectedJournals });
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
          addJournal,
          getDateCountsForMonth,
          getDateCountsForDate,
          getMoodForDate,
          removeJournal,
          onSelectedJournalChange: handleSelectedJournalChange,
          updateJournals,
          getJournalsByDate,
          getJournalsByMonth,
          getJournalsByYear,
        }),
        [
          state.journals,
          state.dailyJournals,
          state.selectedJournal,
          state.monthlyJournals,
          state.yearlyJournals,
          state.isSubmitted,
          addJournal,
          getDateCountsForMonth,
          getDateCountsForDate,
          getMoodForDate,
          removeJournal,
          handleSelectedJournalChange,
          updateJournals,
          getJournalsByDate,
          getJournalsByMonth,
          getJournalsByYear,
        ],
      )}
    >
      {children}
    </JournalContext.Provider>
  );
};
