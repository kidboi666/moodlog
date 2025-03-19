import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Draft, Emotion } from '@/core/types/entries';
import { ISODateString } from '@/core/types/dtos/date';
import { DraftStore } from '@/core/types/store';
import { Nullable } from '@/core/types/utils';
import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { EnhancedTextInputRef } from '@/features/write/components/EnhancedTextInput';
import {
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';

const JOURNAL_IMAGES_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}journal_images/`
  : '';

const initialDraft = {
  content: '',
  emotion: undefined,
  imageUri: '',
};

export const DraftContext = createContext<Nullable<DraftStore>>(null);

export const DraftContextProvider = ({ children }: PropsWithChildren) => {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const enhancedInputRef = useRef<EnhancedTextInputRef>(null);

  const handleLocalDateChange = useCallback((date: ISODateString) => {
    setDraft(prev => ({ ...prev, localDate: date }));
  }, []);

  const handleEmotionChange = useCallback((emotion: Emotion) => {
    setDraft(prev => ({ ...prev, emotion }));
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
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
    setDraft(initialDraft);
  }, []);

  const handleImageUriChange = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== PermissionStatus.GRANTED) {
        alert('사진을 추가하기 위해선 사진 접근 권한이 필요합니다.');
        return null;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled) {
        return null;
      }

      const dirInfo = await FileSystem.getInfoAsync(JOURNAL_IMAGES_DIR);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(JOURNAL_IMAGES_DIR, {
          intermediates: true,
        });
      }

      const dateString = new Date().toISOString().split('T')[0];
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileExt = result.assets[0].uri.split('.').pop();
      const fileName = `${dateString}-${timestamp}-${randomString}.${fileExt}`;
      const newFilePath = `${JOURNAL_IMAGES_DIR}${fileName}`;

      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: newFilePath,
      });

      setDraft(prev => ({ ...prev, imageUri: newFilePath }));
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
          onLocalDateChange: handleLocalDateChange,
          onEmotionChange: handleEmotionChange,
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
          handleLocalDateChange,
          handleEmotionChange,
          handleContentChange,
          handleSelectionChange,
        ],
      )}
    >
      {children}
    </DraftContext.Provider>
  );
};
