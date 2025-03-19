import { useContext } from 'react';
import {
  EntriesJournalContext,
  GlobalJournalContext,
  StatisticJournalContext,
  WeekJournalContext,
} from '../contexts/JournalContext';
import { ContextName } from '@/types/enums';

export const useJournal = (contextName?: ContextName) => {
  let journalContext;

  if (contextName === 'week') {
    journalContext = WeekJournalContext;
  } else if (contextName === 'entries') {
    journalContext = EntriesJournalContext;
  } else if (contextName === 'statistic') {
    journalContext = StatisticJournalContext;
  } else {
    journalContext = GlobalJournalContext;
  }

  const context = useContext(journalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalContextProvider');
  }
  return context;
};
