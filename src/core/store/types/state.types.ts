import { ErrorStatus, LoadingStatus } from '@/types/utill.types';

export type StatusState = LoadingStatus & ErrorStatus;

export type StatusAction =
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_IS_LOADING'; payload: boolean };
