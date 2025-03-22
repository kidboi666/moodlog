export type StepProgressState = {
  currentStep: number;
  totalSteps: number;
};

export type StepProgressAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_TOTAL_STEP'; payload: number };

export type StepProgressStore = {
  totalSteps: number;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isLastStep: boolean;
  progress: number;
};
