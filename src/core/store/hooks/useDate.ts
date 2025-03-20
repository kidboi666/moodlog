import { useContext } from 'react';
import { DateContext } from '@/core/store/contexts/date.context';

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateContextProvider');
  }
  return context;
};
