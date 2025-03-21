import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { Nullable } from '@/types/common.types';
import { ISODateString } from '@/types/date.types';

export type Settings = {
  fontSize: ViewFontSize;
  language: Languages;
  timeFormat: TimeFormat;
};

export type AppState = {
  appVersion: string;
  isInitialApp: boolean;
  firstLaunchDate: Nullable<ISODateString>;
  settings: Settings;
  isLoading: boolean;
  error: Nullable<Error>;
};

export type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Languages }
  | { type: 'SET_FONT_SIZE'; payload: ViewFontSize }
  | { type: 'SET_INITIAL_APP'; payload: boolean }
  | { type: 'SET_FIRST_LAUNCH_DATE'; payload: Nullable<ISODateString> }
  | { type: 'SET_TIME_FORMAT'; payload: TimeFormat }
  | { type: 'INIT_SETTINGS'; payload: Settings }
  | {
      type: 'INIT_APP';
      payload: {
        isInitialApp: boolean;
        firstLaunchDate: Nullable<ISODateString>;
      };
    }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error };

export interface AppStore {
  appVersion: string;
  language: any;
  isInitialApp: boolean;
  timeFormat: TimeFormat;
  fontSize: ViewFontSize;
  initFirstLaunchStatus: () => Promise<void>;
  firstLaunchDate: Nullable<ISODateString>;
  onLanguageChange: (language: any) => void;
  onFontSizeChange: (fontSize: ViewFontSize) => void;
  onTimeFormatChange: (timeFormat: TimeFormat) => void;
  isLoading: boolean;
  error: Error | null;
}
