import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Nullable } from '@/types/common.types';
import { EnhancedTextInputRef } from '@/features/write/components/EnhancedTextInput';
import {
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { DraftStore } from '@/core/store/types';
import { Mood } from '@/types/mood.types';
import { CalendarUtils } from 'react-native-calendars';
import { Draft } from '@/types/journal.types';
import { saveImage } from '@/core/utils/imageUtils';

const initialDraft = {
  content: '',
  mood: undefined,
  imageUri: '',
  localDate: CalendarUtils.getCalendarDateString(new Date()),
};

type DraftAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_IMAGE_URI'; payload: string }
  | { type: 'INIT_DRAFT'; payload: Draft };

const draftReducer = (state: Draft, action: DraftAction): Draft => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_MOOD':
      return { ...state, mood: action.payload };
    case 'SET_IMAGE_URI':
      return { ...state, imageUri: action.payload };
    case 'INIT_DRAFT':
      return action.payload;
    default:
      return state;
  }
};

export const DraftContext = createContext<Nullable<DraftStore>>(null);

export const DraftContextProvider = ({ children }: PropsWithChildren) => {
  const [draft, dispatch] = useReducer(draftReducer, initialDraft);

  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const enhancedInputRef = useRef<EnhancedTextInputRef>(null);

  const handleMoodChange = useCallback((mood: Mood) => {
    dispatch({ type: 'SET_MOOD', payload: mood });
  }, []);

  const handleContentChange = useCallback((content: string) => {
    dispatch({ type: 'SET_CONTENT', payload: content });
  }, []);

  const handleTimeStamp = useCallback(() => {
    enhancedInputRef.current?.insertCurrentTime();
  }, []);

  const handleSelectionChange = useCallback(
    (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      setSelection(event.nativeEvent.selection);
    },
    [],
  );

  const initDraft = useCallback(() => {
    dispatch({ type: 'INIT_DRAFT', payload: initialDraft });
  }, []);

  const handleImageUriChange = useCallback(async () => {
    try {
      const newFilePath = await saveImage();
      if (newFilePath) {
        dispatch({ type: 'SET_IMAGE_URI', payload: newFilePath });
      }
    } catch (err) {
      console.error('Image saving error ', err);
      return null;
    }
  }, []);

  return (
    <DraftContext.Provider
      value={useMemo(
        () => ({
          draft,
          initDraft,
          enhancedInputRef,
          selection,
          onTimeStamp: handleTimeStamp,
          onImageUriChange: handleImageUriChange,
          onMoodChange: handleMoodChange,
          onContentChange: handleContentChange,
          onSelectionChange: handleSelectionChange,
        }),
        [
          draft,
          initDraft,
          enhancedInputRef,
          selection,
          handleTimeStamp,
          handleImageUriChange,
          handleMoodChange,
          handleContentChange,
          handleSelectionChange,
        ],
      )}
    >
      {children}
    </DraftContext.Provider>
  );
};
