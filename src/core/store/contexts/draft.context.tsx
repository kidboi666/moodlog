import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Nullable } from '@/types/common.types';
import { Mood } from '@/types/mood.types';
import { draftReducer } from '@/core/store/reducers/draft.reducer';
import {
  DraftActionContextType,
  DraftContentContextType,
  DraftMetadataContextType,
} from '@/core/store/types/draft.types';
import { DraftService } from '@/core/store/services/draft.service';

export const DraftContentContext =
  createContext<Nullable<DraftContentContextType>>(null);
export const DraftMetadataContext =
  createContext<Nullable<DraftMetadataContextType>>(null);
export const DraftActionContext =
  createContext<Nullable<DraftActionContextType>>(null);

export const DraftContextProvider = ({ children }: PropsWithChildren) => {
  const initialDraft = {
    content: '',
    mood: undefined,
    imageUri: '',
  };

  const [state, dispatch] = useReducer(draftReducer, initialDraft);

  const handleMoodChange = useCallback((mood: Mood) => {
    dispatch({ type: 'SET_MOOD', payload: mood });
  }, []);

  const handleContentChange = useCallback((content: string) => {
    dispatch({ type: 'SET_CONTENT', payload: content });
  }, []);

  const initDraft = useCallback(() => {
    dispatch({ type: 'INIT_DRAFT' });
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
    }),
    [state.content],
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
      onContentChange: handleContentChange,
      onImageUriChange: handleImageUriChange,
      onMoodChange: handleMoodChange,
    }),
    [initDraft, handleImageUriChange, handleMoodChange, handleContentChange],
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
