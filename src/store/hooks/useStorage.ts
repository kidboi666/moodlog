import { StorageContext } from '@/store/contexts/StorageContext';
import { useContext } from 'react';

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within StorageContextProvider');
  }
  return context;
};
