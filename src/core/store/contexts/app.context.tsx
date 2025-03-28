import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import * as Localization from 'expo-localization';
import { Nullable } from '@/types/utill.types';
import { APP_VERSION } from '@/core/constants/common';
import { ISODateString } from '@/types/date.types';
import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { appReducer } from '@/core/store/reducers/app.reducer';
import {
  AppActionContextType,
  AppInfoContextType,
  AppSettingsContextType,
  AppState,
} from '@/core/store/types/app.types';
import { AppService } from '@/core/services/app.service';
import { CalendarUtils } from 'react-native-calendars';
import { StatusState } from '@/core/store/types/state.types';
import { statusReducer } from '@/core/store/reducers/status.reducer';
import { camelToConstantCase } from '@/utils/common';

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
export const AppActionContext =
  createContext<Nullable<AppActionContextType>>(null);
export const AppStatusContext = createContext<Nullable<StatusState>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [status, setStatus] = useReducer(statusReducer, {
    isLoading: false,
    error: null,
  });

  const handleSettingChange = useCallback(
    async <K extends keyof AppSettingsContextType>(
      key: K,
      value: AppSettingsContextType[K],
    ) => {
      try {
        dispatch({
          type: `SET_${camelToConstantCase(key)}` as any,
          payload: value,
        });
        await AppService.saveSetting(state.settings, key, value);
      } catch (err) {
        console.error(`Failed to save ${key} settings failed : `, err);
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
          isInitialApp: true,
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

  const infoValue = useMemo(
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

  const settingsValue = useMemo(
    () => ({
      language: state.settings.language,
      fontSize: state.settings.fontSize,
      timeFormat: state.settings.timeFormat,
    }),
    [
      state.settings.language,
      state.settings.fontSize,
      state.settings.timeFormat,
    ],
  );

  const actionValue = useMemo(
    () => ({
      onSettingChange: handleSettingChange,
    }),
    [handleSettingChange],
  );

  const appStatusValue = useMemo(
    () => ({
      error: status.error,
      isLoading: status.isLoading,
    }),
    [status.error, status.isLoading],
  );

  return (
    <AppInfoContext.Provider value={infoValue}>
      <AppSettingsContext.Provider value={settingsValue}>
        <AppStatusContext.Provider value={appStatusValue}>
          <AppActionContext.Provider value={actionValue}>
            {children}
          </AppActionContext.Provider>
        </AppStatusContext.Provider>
      </AppSettingsContext.Provider>
    </AppInfoContext.Provider>
  );
};

export const useApp = () => {
  const appInfo = useContext(AppInfoContext);
  const appSettings = useContext(AppSettingsContext);
  const appAction = useContext(AppActionContext);
  const status = useContext(AppStatusContext);

  if (!appInfo || !appSettings || !status || !appAction) {
    throw new Error('useApp must be used within a AppContextProvider');
  }

  return {
    ...appInfo,
    ...appAction,
    ...appSettings,
    ...status,
  };
};
