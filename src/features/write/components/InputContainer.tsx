import * as S from '@/features/write/screens/JournalWrite.styled';
import { moodTheme } from '@/core/constants/themes';
import { Form } from 'tamagui';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '@/features/write/components/EnhancedTextInput';
import { ActionButtons } from '@/features/write/components/ActionButtons';
import React, { useCallback, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useToastController } from '@tamagui/toast';
import { useTranslation } from 'react-i18next';
import { Mood } from '@/types/mood.types';
import { Nullable } from '@/types/utill.types';

const JOURNAL_IMAGES_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}journal_images/`
  : '';

interface Props {
  isSubmitting: boolean;
  isSubmitted: boolean;
  onIsSubmittingChange: (bool: boolean) => void;
  onIsSubmittedChange: (bool: boolean) => void;
  onContentChange: (content: string) => void;
  onImageUriChange: (uri: string) => void;
  content: string;
  mood?: Mood;
  imageUri: Nullable<string>;
}

export const InputContainer = ({
  isSubmitting,
  isSubmitted,
  onIsSubmittingChange,
  onIsSubmittedChange,
  onContentChange,
  onImageUriChange,
  content,
  mood,
  imageUri,
}: Props) => {
  const inputRef = useRef<EnhancedTextInputRef>(null);
  const toast = useToastController();
  const { t } = useTranslation();
  const { addJournal } = useJournal();

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
      newFilePath ? onImageUriChange(newFilePath) : null;
    } catch (err) {
      console.error('Image saving error ', err);
      return null;
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      onIsSubmittingChange(true);
      const newDraft = {
        content,
        mood,
        imageUri,
      };
      await addJournal(newDraft);
      toast.show(t('notifications.success.journal.title'), {
        message: t('notifications.success.journal.message'),
        preset: 'success',
      });
      onIsSubmittedChange(true);
    } catch (err) {
      console.error(err);
    } finally {
      onIsSubmittingChange(false);
    }
  }, [content, mood, imageUri, onIsSubmittedChange, onIsSubmittingChange]);

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime();
  }, []);

  return (
    <S.XStackContainer>
      {mood ? (
        <S.ColoredMoodBar moodColor={moodTheme[mood.type][mood.level]} />
      ) : (
        <S.UncoloredMoodBar />
      )}
      <Form gap="$6" flex={1} z={1} onSubmit={handleSubmit}>
        <EnhancedTextInput
          ref={inputRef}
          imageUri={imageUri}
          contentValue={content}
          onContentChange={onContentChange}
        />
        <S.ButtonsViewBox>
          <ActionButtons
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            onTimeStamp={handleTimeStamp}
            onImageUriChange={handleImageUriChange}
            content={content}
          />
        </S.ButtonsViewBox>
      </Form>
    </S.XStackContainer>
  );
};
