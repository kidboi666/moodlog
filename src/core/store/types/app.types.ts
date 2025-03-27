import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { Nullable } from '@/types/utill.types';
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
    };

export type AppInfoContextType = {
  appVersion: string;
  isInitialApp: boolean;
  initFirstLaunchStatus: () => Promise<void>;
  firstLaunchDate: Nullable<ISODateString>;
  initAppData: () => Promise<void>;
};

export type AppSettingsContextType = {
  language: any;
  timeFormat: TimeFormat;
  fontSize: ViewFontSize;
};

export type AppActionContextType = {
  onSettingChange: <K extends keyof AppSettingsContextType>(
    key: K,
    value: AppSettingsContextType[K],
  ) => void;
};
