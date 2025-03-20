import { useContext } from 'react';
import { AppContext } from '@/core/store/contexts/app.context';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
};
