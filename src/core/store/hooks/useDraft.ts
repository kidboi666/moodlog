import { useContext } from 'react';
import { DraftContext } from '@/core/store/contexts/DraftContext';

export const useDraft = () => {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error('useDraft must be used within a DraftContextProvider');
  }
  return context;
};
