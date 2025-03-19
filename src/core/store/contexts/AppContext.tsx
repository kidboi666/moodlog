import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import * as Localization from 'expo-localization';
import { Nullable } from '@/core/types/common.types';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { APP_VERSION } from '@/core/constants/common';
import { AppStore } from '@/core/store/types';
import { ISODateString } from '@/core/types/date.types';
import { Languages, TimeFormat, ViewFontSize } from '@/core/types/app.types';

const DEFAULT_LANGUAGE = Localization.getLocales()[0].languageCode as Languages;

type AppState = {
  fontSize: ViewFontSize;
  language: Languages;
  isInitialApp: boolean;
  timeFormat: TimeFormat;
  firstLaunchDate: Nullable<ISODateString>;
};

const initialState: AppState = {
  fontSize: ViewFontSize.SMALL,
  language: DEFAULT_LANGUAGE,
  isInitialApp: false,
  timeFormat: TimeFormat.HOUR_24,
  firstLaunchDate: null,
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

const appReducer = (state: AppState, action: AppAction): AppState => {
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

export const AppContext = createContext<Nullable<AppStore>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { i18n } = useTranslation();

  const appVersion = useMemo(() => APP_VERSION, []);

  const handleLanguageChange = useCallback((language: Languages) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  }, []);

  const handleFontSizeChange = useCallback((fontSize: ViewFontSize) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: fontSize });
  }, []);

  const handleTimeFormatChange = useCallback((timeFormat: TimeFormat) => {
    dispatch({ type: 'SET_TIME_FORMAT', payload: timeFormat });
  }, []);

  const initializeFirstLaunchStatus = useCallback(async () => {
    const firstLaunchDate = new Date()
      .toISOString()
      .split('T')[0] as ISODateString;

    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEY.INIT, 'true'),
        AsyncStorage.setItem(STORAGE_KEY.FIRST_LAUNCH, firstLaunchDate),
      ]);

      dispatch({
        type: 'INIT_APP',
        payload: { isInitialApp: true, firstLaunchDate },
      });

      return firstLaunchDate;
    } catch (err) {
      console.error('초기화 중 오류 발생:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    if (state.language) {
      i18n
        .changeLanguage(state.language)
        .catch(err => console.error('언어 변경 중 오류 발생:', err));
    }
  }, [state.language, i18n]);

  useEffect(() => {
    const loadInitialValue = async () => {
      try {
        const [isInitialApp, firstLaunchDate] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY.INIT),
          AsyncStorage.getItem(STORAGE_KEY.FIRST_LAUNCH),
        ]);

        if (isInitialApp === 'true') {
          dispatch({
            type: 'INIT_APP',
            payload: {
              isInitialApp: true,
              firstLaunchDate: firstLaunchDate as ISODateString,
            },
          });
        }
      } catch (err) {
        console.error('초기 값 로드 중 오류 발생:', err);
      }
    };

    loadInitialValue();
  }, []);

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          language: state.language,
          isInitialApp: state.isInitialApp,
          appVersion,
          firstLaunchDate: state.firstLaunchDate,
          fontSize: state.fontSize,
          timeFormat: state.timeFormat,
          initializeFirstLaunchStatus,
          onFontSizeChange: handleFontSizeChange,
          onLanguageChange: handleLanguageChange,
          onTimeFormatChange: handleTimeFormatChange,
        }),
        [
          state.language,
          state.isInitialApp,
          appVersion,
          state.firstLaunchDate,
          state.fontSize,
          state.timeFormat,
          initializeFirstLaunchStatus,
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
