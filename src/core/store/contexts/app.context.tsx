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
import { useTranslation } from 'react-i18next';
import { APP_VERSION } from '@/core/constants/common';
import { ISODateString } from '@/types/date.types';
import { Languages, TimeFormat, ViewFontSize } from '@/types/app.types';
import { appReducer } from '@/core/store/reducers/app.reducer';
import { AppState, AppStore } from '@/core/store/types/app.types';
import { AppService } from '@/core/store/services/app.service';

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
  const { i18n } = useTranslation();

  const handleLanguageChange = useCallback(async (language: Languages) => {
    const nextSettings = { ...state.settings, language };
    await AppService.saveSettings(nextSettings);
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  }, []);

  const handleFontSizeChange = useCallback((fontSize: ViewFontSize) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: fontSize });
  }, []);

  const handleTimeFormatChange = useCallback((timeFormat: TimeFormat) => {
    dispatch({ type: 'SET_TIME_FORMAT', payload: timeFormat });
  }, []);

  const initFirstLaunchStatus = useCallback(async () => {
    const firstLaunchDate = new Date()
      .toISOString()
      .split('T')[0] as ISODateString;

    try {
      await Promise.all([
        AppService.saveFirstLaunchStatus(firstLaunchDate),
        AppService.saveSettings(state.settings),
      ]);
      dispatch({
        type: 'INIT_APP',
        payload: { isInitialApp: true, firstLaunchDate },
      });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err });
    }
  }, []);

  useEffect(() => {
    if (state.settings.language) {
      i18n
        .changeLanguage(state.settings.language)
        .catch(err => console.error('언어 변경 중 오류 발생:', err));
    }
  }, [state.settings.language, i18n]);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        dispatch({ type: 'SET_IS_LOADING', payload: true });
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
        dispatch({ type: 'SET_ERROR', payload: err });
      } finally {
        dispatch({ type: 'SET_IS_LOADING', payload: false });
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
