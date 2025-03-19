import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { uuid } from 'expo-modules-core';
import { Nullable } from '@/types/common.types';
import { CalendarUtils } from 'react-native-calendars';
import { MONTHS } from '@/core/constants/date';
import { getISODateString } from '@/core/utils/common';
import { useDate } from '@/core/store/hooks/useDate';
import { useStorage } from '@/core/store/hooks/useStorage';
import { ContextName, JournalStore } from '@/core/store/types';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import { Draft, Journal } from '@/types/journal.types';

export const CreateJournalContext = (contextName: ContextName) => {
  const Context = createContext<Nullable<JournalStore>>(null);

  Context.displayName = `${contextName}JournalContext`;

  const Provider = ({ children }: PropsWithChildren) => {
    const {
      selectedYear,
      selectedMonth,
      selectedDate,
      currentYear,
      currentMonth,
      currentDate,
    } = useDate(contextName);
    const { journals, setJournals } = useStorage();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [yearlyJournals, setYearlyJournals] = useState<Journal[]>([]);
    const [monthlyJournals, setMonthlyJournals] = useState<Journal[]>([]);
    const [dailyJournals, setDailyJournals] = useState<
      Journal[] | ISODateString
    >([]);
    const [selectedJournal, setSelectedJournal] = useState<Journal>();

    const handleSelectedJournalChange = useCallback(
      (journalId: string) => {
        if (journals.length > 0) {
          setSelectedJournal(journals.find(item => item.id === journalId));
        }
      },
      [journals],
    );

    const currentDateString = useMemo(
      () => getISODateString(currentYear, currentMonth, currentDate.getDate()),
      [currentYear, currentMonth, currentDate],
    );

    const addJournal = useCallback(
      (draft: Draft) => {
        if (draft.content && draft.mood) {
          const newJournal = {
            id: uuid.v4(),
            content: draft.content,
            mood: draft.mood,
            createdAt: new Date().toISOString(),
            localDate: getISODateString(
              currentYear,
              currentMonth,
              currentDate.getDate(),
            ),
            imageUri: draft.imageUri ? draft.imageUri : null,
          };
          setJournals(prev => [...prev, newJournal]);
          setIsSubmitted(true);
        }
      },
      [currentDateString, currentYear, currentMonth, currentDate],
    );

    const getDateCountsForDate = useCallback(
      (year: number, month: number | string, date: number) => {
        let intMonth: number;
        if (typeof month === 'string') {
          intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
        } else {
          intMonth = month;
        }

        const dateString = `${year}-${(intMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
        const foundJournals = journals.filter(
          journal => journal.localDate === dateString,
        );

        return foundJournals.length;
      },
      [journals],
    );

    const getMoodForDate = useCallback(
      (year: number, month: number, date: number) => {
        const dateString = getISODateString(year, month, date);
        const foundJournals = journals.filter(
          journal => journal.localDate === dateString,
        );

        return foundJournals.map(journal => journal.mood);
      },
      [journals],
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

        journals.forEach(journal => {
          if (counts.hasOwnProperty(journal.localDate)) {
            counts[journal.localDate]++;
          }
        });

        return counts;
      },
      [journals],
    );

    const removeJournal = useCallback(
      (id: string) => {
        setJournals(prev => prev.filter(journal => journal.id !== id));
      },
      [setJournals],
    );

    const updateJournals = useCallback(
      (id: string, newJournal: Journal) => {
        setJournals(prev =>
          prev.map(journal => (journal.id === id ? newJournal : journal)),
        );
      },
      [setJournals],
    );

    const getJournalsByDate = useCallback(
      (date: ISODateString) => {
        const selectedJournals = journals.filter(
          journal => journal.localDate === date,
        );
        if (selectedJournals.length === 0) {
          setDailyJournals(date);
        } else {
          setDailyJournals(selectedJournals);
        }
      },
      [journals],
    );

    const getJournalsByMonth = useCallback(
      (date: ISOMonthString) => {
        const selectedJournals = journals.filter(journal =>
          journal.localDate.startsWith(date),
        );
        setMonthlyJournals(selectedJournals);
      },
      [journals],
    );

    const getJournalsByYear = useCallback(
      (year: number) => {
        const selectedJournals = journals.filter(journal =>
          journal.localDate.startsWith(year.toString()),
        );
        setYearlyJournals(selectedJournals);
      },
      [journals],
    );

    const handleSubmittedChange = useCallback(() => {
      setIsSubmitted(prev => !prev);
    }, []);

    useEffect(() => {
      if (selectedDate) {
        getJournalsByDate(selectedDate);
      }
    }, [selectedDate]);

    useEffect(() => {
      if (selectedMonth) {
        getJournalsByMonth(selectedMonth);
      }
    }, [selectedMonth]);

    useEffect(() => {
      if (selectedYear) {
        getJournalsByYear(selectedYear);
      }
    }, [selectedYear]);

    useEffect(() => {
      getJournalsByDate(CalendarUtils.getCalendarDateString(new Date()));
    }, [getJournalsByDate]);

    return (
      <Context.Provider
        value={useMemo(
          () => ({
            journals,
            dailyJournals,
            selectedJournal,
            monthlyJournals,
            yearlyJournals,
            isSubmitted,
            addJournal,
            getDateCountsForMonth,
            getDateCountsForDate,
            getMoodForDate,
            removeJournal,
            onSelectedJournalChange: handleSelectedJournalChange,
            onSubmittedChange: handleSubmittedChange,
            updateJournals,
            getJournalsByDate,
            getJournalsByMonth,
            getJournalsByYear,
          }),
          [
            journals,
            dailyJournals,
            selectedJournal,
            monthlyJournals,
            yearlyJournals,
            isSubmitted,
            addJournal,
            getDateCountsForMonth,
            getDateCountsForDate,
            getMoodForDate,
            removeJournal,
            handleSelectedJournalChange,
            handleSubmittedChange,
            updateJournals,
            getJournalsByDate,
            getJournalsByMonth,
            getJournalsByYear,
          ],
        )}
      >
        {children}
      </Context.Provider>
    );
  };

  return {
    Provider,
    Context,
  };
};

export const {
  Provider: EntriesJournalProvider,
  Context: EntriesJournalContext,
} = CreateJournalContext('entries');
export const { Provider: WeekJournalProvider, Context: WeekJournalContext } =
  CreateJournalContext('week');
export const {
  Provider: StatisticJournalProvider,
  Context: StatisticJournalContext,
} = CreateJournalContext('statistic');
export const {
  Provider: GlobalJournalProvider,
  Context: GlobalJournalContext,
} = CreateJournalContext('global');
