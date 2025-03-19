import { useContext } from 'react';
import { ScrollContext } from '@/core/store/contexts/ScrollContext';

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollContextProvider');
  }
  return context;
};
