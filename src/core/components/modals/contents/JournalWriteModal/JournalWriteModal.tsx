import { MoodLevel, MoodType } from '@/types/mood.types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Draft } from '@/types/journal.types';
import * as S from './JournalWriteModal.styled';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '@/core/components/modals/contents/JournalWriteModal/components/EnhancedTextInput';
import { Form, useTheme } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { moodTheme } from '@/core/constants/themes';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ActionButtons } from '@/core/components/modals/contents/JournalWriteModal/components/ActionButtons';

const initialDraft: Draft = {
  content: '',
  mood: undefined,
  imageUri: '',
};

interface Props {
  moodType: MoodType;
  moodLevel: MoodLevel;
  isLoading: boolean;
  isSubmitted: boolean;
  onSubmit: (draft: Draft) => void;
}

const JOURNAL_IMAGES_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}journal_images/`
  : '';
export const JournalWriteModal = ({
  moodType,
  moodLevel,
  isLoading,
  isSubmitted,
  onSubmit,
}: Props) => {
  const [draft, setDraft] = useState<Draft>(initialDraft);

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  useEffect(() => {
    setDraft(prev => ({
      ...prev,
      mood: {
        type: moodType,
        level: moodLevel,
      },
    }));
  }, []);

  const inputRef = useRef<EnhancedTextInputRef>(null);
  const theme = useTheme();

  const saveImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

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

    return newFilePath;
  }, [JOURNAL_IMAGES_DIR]);

  const handleImageUriChange = useCallback(async () => {
    try {
      const newFilePath = await saveImage();
      newFilePath
        ? setDraft(prev => ({ ...prev, imageUri: newFilePath }))
        : null;
    } catch (err) {
      console.error('Image saving error ', err);
      return null;
    }
  }, []);

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime();
  }, []);

  const contentContainerStyle = useMemo(
    () => ({
      backgroundColor: theme.red5.val,
      flex: 1,
    }),
    [theme.red5.val],
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  return (
    <S.BottomSheetContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
      >
        <S.XStackContainer>
          {draft.mood ? (
            <S.ColoredMoodBar
              moodColor={moodTheme[draft.mood.type][draft.mood.level]}
            />
          ) : (
            <S.UncoloredMoodBar />
          )}
          <Form flex={1} onSubmit={() => onSubmit(draft)}>
            <EnhancedTextInput
              ref={inputRef}
              imageUri={draft.imageUri}
              contentValue={draft.content}
              onContentChange={handleContentChange}
            />
            <S.ButtonsViewBox>
              <ActionButtons
                isSubmitted={isSubmitted}
                isLoading={isLoading}
                onTimeStamp={handleTimeStamp}
                onImageUriChange={handleImageUriChange}
                content={draft.content}
              />
            </S.ButtonsViewBox>
          </Form>
        </S.XStackContainer>
      </KeyboardAvoidingView>
    </S.BottomSheetContainer>
  );
};
