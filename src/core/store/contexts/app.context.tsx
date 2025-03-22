import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import * as Localization from 'expo-localization';
import { Nullable } from '@/types/common.types';
import { APP_VERSION } from '@/core/constants/common';
import { ISODateString } from '@/types/date.types';
import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { appReducer } from '@/core/store/reducers/app.reducer';
import {
  AppInfoContextType,
  AppSettingsContextType,
  AppState,
} from '@/core/store/types/app.types';
import { AppService } from '@/core/store/services/app.service';
import { CalendarUtils } from 'react-native-calendars';
import { StatusState } from '@/core/store/types/state.types';
import { statusReducer } from '@/core/store/reducers/status.reducer';

const DEFAULT_LANGUAGE = Localization.getLocales()[0].languageCode as Languages;

const initialState: AppState = {
  appVersion: APP_VERSION,
  isInitialApp: false,
  firstLaunchDate: null,
  settings: {
    fontSize: ViewFontSize.SMALL,
    language: DEFAULT_LANGUAGE,
    timeFormat: TimeFormat.HOUR_24,
  },
};

export const AppInfoContext = createContext<Nullable<AppInfoContextType>>(null);
export const AppSettingsContext =
  createContext<Nullable<AppSettingsContextType>>(null);
export const AppStatusContext = createContext<Nullable<StatusState>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [status, setStatus] = useReducer(statusReducer, {
    isLoading: false,
    error: null,
  });

  const handleLanguageChange = useCallback(
    async (language: Languages) => {
      try {
        dispatch({ type: 'SET_LANGUAGE', payload: language });
        await AppService.saveSetting(state.settings, 'language', language);
      } catch (err) {
        console.error('save settings failed : ', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.settings],
  );

  const handleFontSizeChange = useCallback(
    async (fontSize: ViewFontSize) => {
      try {
        dispatch({ type: 'SET_FONT_SIZE', payload: fontSize });
        await AppService.saveSetting(state.settings, 'fontSize', fontSize);
      } catch (err) {
        console.error('save settings failed : ', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.settings],
  );

  const handleTimeFormatChange = useCallback(
    async (timeFormat: TimeFormat) => {
      try {
        dispatch({ type: 'SET_TIME_FORMAT', payload: timeFormat });
        await AppService.saveSetting(state.settings, 'timeFormat', timeFormat);
      } catch (err) {
        console.error('save settings failed : ', err);
        setStatus({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.settings],
  );

  const initFirstLaunchStatus = useCallback(async () => {
    try {
      setStatus({ type: 'SET_IS_LOADING', payload: true });
      const firstLaunchDate = CalendarUtils.getCalendarDateString(new Date());

      await Promise.all([
        AppService.saveFirstLaunchStatus(firstLaunchDate),
        AppService.initSettings(state.settings),
      ]);
      dispatch({
        type: 'INIT_APP',
        payload: { isInitialApp: true, firstLaunchDate },
      });
    } catch (err) {
      console.error('load firstLaunchStatus failed : ', err);
      setStatus({ type: 'SET_ERROR', payload: err });
    } finally {
      setStatus({ type: 'SET_IS_LOADING', payload: false });
    }
  }, [state.settings]);

  const initAppData = useCallback(async () => {
    try {
      setStatus({ type: 'SET_IS_LOADING', payload: true });
      const [firstLaunchDate, settings] = await Promise.all([
        AppService.loadFirstLaunchStatus(),
        AppService.loadSettings(),
      ]);
      dispatch({
        type: 'INIT_APP',
        payload: {
          isInitialApp: !!firstLaunchDate,
          firstLaunchDate: firstLaunchDate as ISODateString,
        },
      });

      if (settings) {
        dispatch({ type: 'INIT_SETTINGS', payload: settings });
      }
    } catch (err) {
      console.error('load settings failed : ', err);
      setStatus({ type: 'SET_ERROR', payload: err });
    } finally {
      setStatus({ type: 'SET_IS_LOADING', payload: false });
    }
  }, []);

  const appInfoValue = useMemo(
    () => ({
      appVersion: state.appVersion,
      isInitialApp: state.isInitialApp,
      firstLaunchDate: state.firstLaunchDate,
      initFirstLaunchStatus,
      initAppData,
    }),
    [
      state.appVersion,
      state.isInitialApp,
      state.firstLaunchDate,
      initFirstLaunchStatus,
      initAppData,
    ],
  );

  const appSettingsValue = useMemo(
    () => ({
      language: state.settings.language,
      fontSize: state.settings.fontSize,
      timeFormat: state.settings.timeFormat,
      onFontSizeChange: handleFontSizeChange,
      onLanguageChange: handleLanguageChange,
      onTimeFormatChange: handleTimeFormatChange,
    }),
    [
      state.settings.language,
      state.settings.fontSize,
      state.settings.timeFormat,
      handleFontSizeChange,
      handleLanguageChange,
      handleTimeFormatChange,
    ],
  );

  const appStatusValue = useMemo(
    () => ({
      error: status.error,
      isLoading: status.isLoading,
    }),
    [status.error, status.isLoading],
  );

  return (
    <AppInfoContext.Provider value={appInfoValue}>
      <AppSettingsContext.Provider value={appSettingsValue}>
        <AppStatusContext.Provider value={appStatusValue}>
          {children}
        </AppStatusContext.Provider>
      </AppSettingsContext.Provider>
    </AppInfoContext.Provider>
  );
};

export const useApp = () => {
  const appInfo = useContext(AppInfoContext);
  const appSettings = useContext(AppSettingsContext);
  const status = useContext(AppStatusContext);
  if (!appInfo || !appSettings || !status) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return {
    ...appInfo,
    ...appSettings,
    ...status,
  };
};
