import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
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
import { Mood } from '@/types/mood.types';
import { draftReducer } from '@/core/store/reducers/draft.reducer';
import {
  DraftActionContextType,
  DraftContentContextType,
  DraftMetadataContextType,
} from '@/core/store/types/draft.types';
import { DraftService } from '@/core/store/services/draft.service';

const initialDraft = {
  content: '',
  mood: undefined,
  imageUri: '',
};

export const DraftContentContext =
  createContext<Nullable<DraftContentContextType>>(null);
export const DraftMetadataContext =
  createContext<Nullable<DraftMetadataContextType>>(null);
export const DraftActionContext =
  createContext<Nullable<DraftActionContextType>>(null);

export const DraftContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(draftReducer, initialDraft);

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
      const newFilePath = await DraftService.saveImage();
      newFilePath
        ? dispatch({ type: 'SET_IMAGE_URI', payload: newFilePath })
        : null;
    } catch (err) {
      console.error('Image saving error ', err);
      return null;
    }
  }, []);

  const draftContentValue = useMemo(
    () => ({
      content: state.content,
      onContentChange: handleContentChange,
    }),
    [state.content, handleContentChange],
  );

  const draftMetadataValue = useMemo(
    () => ({
      mood: state.mood,
      imageUri: state.imageUri,
    }),
    [state.mood, state.imageUri],
  );

  const draftActionValue = useMemo(
    () => ({
      initDraft,
      enhancedInputRef,
      selection,
      onTimeStamp: handleTimeStamp,
      onImageUriChange: handleImageUriChange,
      onMoodChange: handleMoodChange,
      onSelectionChange: handleSelectionChange,
    }),
    [
      initDraft,
      enhancedInputRef,
      selection,
      handleTimeStamp,
      handleImageUriChange,
      handleMoodChange,
      handleSelectionChange,
    ],
  );

  return (
    <DraftContentContext.Provider value={draftContentValue}>
      <DraftMetadataContext.Provider value={draftMetadataValue}>
        <DraftActionContext.Provider value={draftActionValue}>
          {children}
        </DraftActionContext.Provider>
      </DraftMetadataContext.Provider>
    </DraftContentContext.Provider>
  );
};

export const useDraft = () => {
  const draftContent = useContext(DraftContentContext);
  const draftMetadata = useContext(DraftMetadataContext);
  const draftAction = useContext(DraftActionContext);

  if (!draftContent || !draftMetadata || !draftAction) {
    throw new Error('useDraft must be used within a DraftContextProvider');
  }

  return {
    ...draftContent,
    ...draftMetadata,
    ...draftAction,
  };
};
