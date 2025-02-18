import { useContext } from 'react';
import { AppContext } from '@/store/contexts/AppContext';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
};
