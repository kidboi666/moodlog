import { AppAction, AppState } from '@/core/store/types/app.types';

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        settings: { ...state.settings, language: action.payload },
      };
    case 'SET_FONT_SIZE':
      return {
        ...state,
        settings: { ...state.settings, fontSize: action.payload },
      };
    case 'SET_TIME_FORMAT':
      return {
        ...state,
        settings: { ...state.settings, timeFormat: action.payload },
      };
    case 'SET_FIRST_LAUNCH_DATE':
      return { ...state, firstLaunchDate: action.payload };
    case 'INIT_APP':
      return {
        ...state,
        isInitialApp: action.payload.isInitialApp,
        firstLaunchDate: action.payload.firstLaunchDate,
      };
    case 'INIT_SETTINGS':
      return { ...state, settings: action.payload };
    default:
      return state;
  }
};
