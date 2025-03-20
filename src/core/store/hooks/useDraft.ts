import { useContext } from 'react';
import { DraftContext } from '@/core/store/contexts/draft.context';

export const useDraft = () => {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error('useDraft must be used within a DraftContextProvider');
  }
  return context;
};
