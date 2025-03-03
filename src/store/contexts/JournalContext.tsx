import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { JournalStore } from 'src/types/store';
import { DateCounts, Draft, Journal } from '@/types/entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { useToastController } from '@tamagui/toast';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { Nullable } from '@/types/utils';
import { STORAGE_KEY } from '@/constants/storage';
import { CalendarUtils } from 'react-native-calendars';
import { MONTHS } from '@/constants/date';
import { useDate } from '@/store/hooks/useDate';
import { getISODateString } from '@/utils/common';

export const JournalContext = createContext<Nullable<JournalStore>>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const { selectedYear, selectedMonth, selectedDate } = useDate();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [yearlyJournals, setYearlyJournals] = useState<Journal[]>([]);
  const [monthlyJournals, setMonthlyJournals] = useState<Journal[]>([]);
  const [dailyJournals, setDailyJournals] = useState<Journal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<Journal>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastController();

  const handleSelectedJournalChange = (journalId: string) => {
    if (journals.length > 0) {
      setSelectedJournal(journals.find(item => item.id === journalId));
    }
  };

  const addJournal = (draft: Draft) => {
    if (draft.content && draft.emotion && draft.localDate) {
      const newJournal = {
        id: uuid.v4(),
        content: draft.content,
        emotion: draft.emotion,
        createdAt: new Date().toISOString(),
        localDate: draft.localDate,
        imageUri: draft.imageUri ? draft.imageUri : null,
      };
      setJournals(prev => [...prev, newJournal]);
      setIsSubmitted(true);
    }
  };

  const getDateCountsForDate = (
    year: number,
    month: number | string,
    date: number,
  ) => {
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
  };

  const getEmotionForDate = (year: number, month: number, date: number) => {
    const dateString = getISODateString(year, month, date);
    const foundJournals = journals.filter(
      journal => journal.localDate === dateString,
    );

    return foundJournals.map(journal => journal.emotion);
  };

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

  const removeJournal = useCallback((id: string) => {
    setJournals(prev => prev.filter(journal => journal.id !== id));
  }, []);

  const updateJournals = useCallback((id: string, newJournal: Journal) => {
    setJournals(prev =>
      prev.map(journal => (journal.id === id ? newJournal : journal)),
    );
  }, []);

  const getJournalsByDate = useCallback(
    (date: ISODateString) => {
      const selectedJournals =
        journals.filter(journal => journal.localDate === date) || [];
      setDailyJournals(selectedJournals);
    },
    [journals],
  );

  const getJournalsByMonth = (date: ISOMonthString) => {
    const selectedJournals = journals.filter(journal =>
      journal.localDate.startsWith(date),
    );
    setMonthlyJournals(selectedJournals);
  };

  const getJournalsByYear = (year: number) => {
    const selectedJournals = journals.filter(journal =>
      journal.localDate.startsWith(year.toString()),
    );
    setYearlyJournals(selectedJournals);
  };

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
    const loadJournals = async () => {
      try {
        setIsLoading(true);
        const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);
        if (!savedJournals) {
          const backupJournals = await AsyncStorage.getItem(STORAGE_KEY.BACKUP);
          if (backupJournals) {
            setJournals(JSON.parse(backupJournals));
            toast.show('Restored from backup', {
              message: 'Your data has been restored',
            });
            return;
          }
        }

        setJournals(JSON.parse(savedJournals || '[]'));
      } catch (error) {
        console.error('Load error:', error);
        toast.show('Error loading journals', {
          message: 'Please try again later',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    void loadJournals();
  }, []);

  useEffect(() => {
    const saveJournals = async () => {
      try {
        setIsLoading(true);

        if (!Array.isArray(journals)) return null;

        await AsyncStorage.setItem(
          STORAGE_KEY.JOURNALS,
          JSON.stringify(journals),
        );

        if (journals.length > 0) {
          await AsyncStorage.setItem(
            STORAGE_KEY.BACKUP,
            JSON.stringify(journals),
          );
        }
      } catch (error) {
        const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);
        if (savedJournals) {
          setJournals(JSON.parse(savedJournals));
        }

        toast.show('Error saving journals', {
          message: 'Your data has been restored',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    saveJournals();
  }, [journals]);

  useEffect(() => {
    const initializeSelectedJournals = () => {
      getJournalsByDate(CalendarUtils.getCalendarDateString(new Date()));
    };

    if (journals.length >= 0 && !isLoading) {
      initializeSelectedJournals();
    }
  }, [journals, isLoading, getJournalsByDate]);

  return (
    <JournalContext.Provider
      value={{
        journals,
        dailyJournals,
        selectedJournal,
        monthlyJournals,
        yearlyJournals,
        addJournal,
        isLoading,
        isSubmitted,
        getDateCountsForMonth,
        getDateCountsForDate,
        getEmotionForDate,
        removeJournal,
        onSelectedJournalChange: handleSelectedJournalChange,
        updateJournals,
        getJournalsByDate,
        getJournalsByMonth,
        getJournalsByYear,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
