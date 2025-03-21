import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { stepProgressReducer } from '@/core/store/reducers/step-progress.reducer';
import { StepProgressStore } from '@/core/store/types/step-progress.types';

interface Props {
  totalSteps: number;
}

export const StepProgressContext =
  createContext<Nullable<StepProgressStore>>(null);

export const StepProgressContextProvider = ({
  children,
  totalSteps,
}: PropsWithChildren<Props>) => {
  const [state, dispatch] = useReducer(stepProgressReducer, {
    currentStep: 0,
    totalSteps,
  });

  const goToNextStep = useCallback(() => {
    dispatch({
      type: 'SET_STEP',
      payload: Math.min(state.currentStep + 1, state.totalSteps - 1),
    });
  }, []);

  const goToPrevStep = useCallback(() => {
    dispatch({
      type: 'SET_STEP',
      payload: Math.max(state.currentStep - 1, 0),
    });
  }, []);

  const isLastStep = state.currentStep === state.totalSteps - 1;
  const progress =
    state.totalSteps > 1 ? (state.currentStep / state.totalSteps) * 100 : 100;

  return (
    <StepProgressContext.Provider
      value={useMemo(
        () => ({
          totalSteps: state.totalSteps,
          currentStep: state.currentStep,
          isLastStep,
          progress,
          goToNextStep,
          goToPrevStep,
        }),
        [
          state.totalSteps,
          state.currentStep,
          isLastStep,
          progress,
          goToNextStep,
          goToPrevStep,
        ],
      )}
    >
      {children}
    </StepProgressContext.Provider>
  );
};

export const useStepProgress = () => {
  const context = useContext(StepProgressContext);
  if (!context) {
    throw new Error(
      'useSteProgress must be used within a StepProgressContextProvider',
    );
  }
  return context;
};
