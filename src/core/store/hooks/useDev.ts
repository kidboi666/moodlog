import { useContext } from 'react';
import { DevContext } from '@/core/store/contexts/DevContext';

export const useDev = () => {
  const context = useContext(DevContext);
  if (!context) {
    throw new Error('useDev must be used within a DevContextProvider');
  }
  return context;
};
