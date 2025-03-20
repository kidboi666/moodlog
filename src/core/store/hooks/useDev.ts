import { useContext } from 'react';
import { DevContext } from '@/core/store/contexts/dev.context';

export const useDev = () => {
  const context = useContext(DevContext);
  if (!context) {
    throw new Error('useDev must be used within a DevContextProvider');
  }
  return context;
};
