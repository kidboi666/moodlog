import { StatisticsContext } from '@/core/store/contexts/statistics.context';
import { useContext } from 'react';

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error(
      'useStatistics must be used within a StatisticsContextProvider',
    );
  }
  return context;
};
