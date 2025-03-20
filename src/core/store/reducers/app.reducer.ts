import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { Nullable } from '@/types/common.types';
import { ISODateString } from '@/types/date.types';

type AppState = {
  appVersion: string;
  fontSize: ViewFontSize;
  language: Languages;
  isInitialApp: boolean;
  timeFormat: TimeFormat;
  firstLaunchDate: Nullable<ISODateString>;
};

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Languages }
  | { type: 'SET_FONT_SIZE'; payload: ViewFontSize }
  | { type: 'SET_INITIAL_APP'; payload: boolean }
  | { type: 'SET_FIRST_LAUNCH_DATE'; payload: Nullable<ISODateString> }
  | { type: 'SET_TIME_FORMAT'; payload: TimeFormat }
  | {
      type: 'INIT_APP';
      payload: {
        isInitialApp: boolean;
        firstLaunchDate: Nullable<ISODateString>;
      };
    };

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'SET_INITIAL_APP':
      return { ...state, isInitialApp: action.payload };
    case 'SET_FIRST_LAUNCH_DATE':
      return { ...state, firstLaunchDate: action.payload };
    case 'SET_TIME_FORMAT':
      return { ...state, timeFormat: action.payload };
    case 'INIT_APP':
      return {
        ...state,
        isInitialApp: action.payload.isInitialApp,
        firstLaunchDate: action.payload.firstLaunchDate,
      };
    default:
      return state;
  }
};
