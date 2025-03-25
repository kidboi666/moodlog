import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, useTheme } from 'tamagui';
import { moodTheme } from '@/core/constants/themes';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { WriteHeader } from '@/features/write/components/WriteHeader';
import { ActionButtons } from '@/features/write/components/ActionButtons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import * as S from './JournalWrite.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '../components/EnhancedTextInput';
import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Draft } from '@/types/journal.types';
import { MoodLevel, MoodType } from '@/types/mood.types';

const JOURNAL_IMAGES_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}journal_images/`
  : '';

export const JournalWriteScreen = () => {
  const router = useRouter();
  const { addJournal } = useJournal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToastController();
  const { t } = useTranslation();
  const theme = useTheme();
  const inputRef = useRef<EnhancedTextInputRef>(null);
  const params = useLocalSearchParams<{ type: MoodType; level: string }>();
  const moodType = params.type as MoodType;
  const moodLevel = params.level as MoodLevel;
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      type: moodType,
      level: moodLevel,
    },
    imageUri: '',
  });

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

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

  const handleSubmit = useCallback(async () => {
    console.log('draft 값,', draft);
    await addJournal(draft);
    toast.show(t('notifications.success.journal.title'), {
      message: t('notifications.success.journal.message'),
    });
    setIsSubmitted(true);
  }, [draft]);

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime();
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      router.push('/');
    }
  }, [isSubmitted]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={{ backgroundColor: theme.red5.val }}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -40 : 0}
    >
      <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill}>
        <S.ViewContainer
          edges={['bottom']}
          Header={
            <S.HeaderWrapper>
              <WriteHeader />
            </S.HeaderWrapper>
          }
        >
          <Link href="/(tabs)" asChild>
            <Button animation="medium">asdf</Button>
          </Link>
          <S.XStackContainer>
            {draft.mood ? (
              <S.ColoredMoodBar
                moodColor={moodTheme[draft.mood.type][draft.mood.level]}
              />
            ) : (
              <S.UncoloredMoodBar />
            )}
            <Form gap="$6" flex={1} z={1} onSubmit={handleSubmit}>
              <EnhancedTextInput
                ref={inputRef}
                imageUri={draft.imageUri}
                contentValue={draft.content}
                onContentChange={handleContentChange}
              />
              <S.ButtonsViewBox>
                <ActionButtons
                  onTimeStamp={handleTimeStamp}
                  onImageUriChange={handleImageUriChange}
                />
              </S.ButtonsViewBox>
            </Form>
          </S.XStackContainer>
        </S.ViewContainer>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
