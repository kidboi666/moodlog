import { useContext } from 'react';
import {
  EntriesDateContext,
  GlobalDateContext,
  StatisticDateContext,
  WeekDateContext,
} from '@/core/store/contexts/DateContext';
import { ContextName } from '@/core/types/enums';

export const useDate = (contextName: ContextName) => {
  let dateContext;

  if (contextName === 'week') {
    dateContext = WeekDateContext;
  } else if (contextName === 'entries') {
    dateContext = EntriesDateContext;
  } else if (contextName === 'statistic') {
    dateContext = StatisticDateContext;
  } else {
    dateContext = GlobalDateContext;
  }

  const context = useContext(dateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateContextProvider');
  }
  return context;
};
