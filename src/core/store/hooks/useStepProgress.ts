import { useContext } from 'react';
import { StepProgressContext } from '@/core/store/contexts/page-progress.context';

export const useStepProgress = () => {
  const context = useContext(StepProgressContext);
  if (!context) {
    throw new Error(
      'useSteProgress must be used within a StepProgressContextProvider',
    );
  }
  return context;
};
