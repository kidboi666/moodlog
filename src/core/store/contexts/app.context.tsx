import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import * as Localization from 'expo-localization';
import { Nullable } from '@/types/common.types';
import { APP_VERSION } from '@/core/constants/common';
import { ISODateString } from '@/types/date.types';
import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { appReducer } from '@/core/store/reducers/app.reducer';
import { AppState, AppStore } from '@/core/store/types/app.types';
import { AppService } from '@/core/store/services/app.service';
import { CalendarUtils } from 'react-native-calendars';

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
  error: null,
  isLoading: false,
};

export const AppContext = createContext<Nullable<AppStore>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleLanguageChange = useCallback(
    async (language: Languages) => {
      try {
        dispatch({ type: 'SET_LANGUAGE', payload: language });
        await AppService.saveSetting(state.settings, 'language', language);
      } catch (err) {
        console.error('save settings failed : ', err);
        dispatch({ type: 'SET_ERROR', payload: err });
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
        dispatch({ type: 'SET_ERROR', payload: err });
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
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    },
    [state.settings],
  );

  const initFirstLaunchStatus = useCallback(async () => {
    try {
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
      dispatch({ type: 'SET_ERROR', payload: err });
    }
  }, [state.settings]);

  useEffect(() => {
    const loadAppData = async () => {
      try {
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
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    };

    void loadAppData();
  }, []);

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          appVersion: state.appVersion,
          isInitialApp: state.isInitialApp,
          firstLaunchDate: state.firstLaunchDate,
          language: state.settings.language,
          fontSize: state.settings.fontSize,
          timeFormat: state.settings.timeFormat,
          error: state.error,
          isLoading: state.isLoading,
          initFirstLaunchStatus,
          onFontSizeChange: handleFontSizeChange,
          onLanguageChange: handleLanguageChange,
          onTimeFormatChange: handleTimeFormatChange,
        }),
        [
          state.appVersion,
          state.isInitialApp,
          state.firstLaunchDate,
          state.settings.language,
          state.settings.fontSize,
          state.settings.timeFormat,
          state.error,
          state.isLoading,
          initFirstLaunchStatus,
          handleFontSizeChange,
          handleLanguageChange,
          handleTimeFormatChange,
        ],
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
};
