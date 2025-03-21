import {
  StepProgressAction,
  StepProgressState,
} from '@/core/store/types/step-progress.types';

export const stepProgressReducer = (
  state: StepProgressState,
  action: StepProgressAction,
) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    default:
      return state;
  }
};
