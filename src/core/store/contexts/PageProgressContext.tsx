import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Nullable } from '@/types/utils';
import { StepProgressStore } from '@/types/store';

export const StepProgressContext =
  createContext<Nullable<StepProgressStore>>(null);

interface Props {
  initialStep?: number;
  totalSteps: number;
}

export const StepProgressContextProvider = ({
  children,
  initialStep = 0,
  totalSteps,
}: PropsWithChildren<Props>) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev + 1 < totalSteps) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  }, [totalSteps]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev - 1 >= 0) {
        return prev - 1;
      } else {
        return totalSteps - 1;
      }
    });
  }, [totalSteps]);

  const isLastStep = useMemo(
    () => currentStep === totalSteps - 1,
    [currentStep, totalSteps],
  );
  const progress = useMemo(
    () => (totalSteps > 1 ? (currentStep / totalSteps) * 100 : 0),
    [totalSteps, currentStep],
  );

  return (
    <StepProgressContext.Provider
      value={useMemo(
        () => ({
          totalSteps,
          currentStep,
          goToNextStep,
          goToPrevStep,
          isLastStep,
          progress,
        }),
        [
          totalSteps,
          currentStep,
          goToNextStep,
          goToPrevStep,
          isLastStep,
          progress,
        ],
      )}
    >
      {children}
    </StepProgressContext.Provider>
  );
};
