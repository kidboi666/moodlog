import React, { useCallback, useRef } from 'react';
import { useTheme } from 'tamagui';
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
import { useRouter } from 'expo-router';
import * as S from './JournalWrite.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useDraft } from '@/core/store/contexts/draft.context';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '../components/EnhancedTextInput';

export const JournalWriteScreen = () => {
  const router = useRouter();
  const { mood, content, imageUri, onContentChange, onImageUriChange } =
    useDraft();
  const { addJournal } = useJournal();
  const toast = useToastController();
  const { t } = useTranslation();
  const theme = useTheme();
  const inputRef = useRef<EnhancedTextInputRef>(null);

  const handleSubmit = useCallback(async () => {
    const newDraft = {
      content,
      mood,
      imageUri,
    };
    await addJournal(newDraft);
    toast.show(t('notifications.success.journal.title'), {
      message: t('notifications.success.journal.message'),
    });
    router.push('/(tabs)');
  }, []);

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime();
  }, []);

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
          <S.XStackContainer>
            {mood ? (
              <S.ColoredMoodBar
                moodColor={moodTheme[mood?.type][mood?.level]}
              />
            ) : (
              <S.UncoloredMoodBar />
            )}
            <S.TextContentBox>
              <EnhancedTextInput
                ref={inputRef}
                imageUri={imageUri}
                contentValue={content}
                onContentChange={onContentChange}
              />
              <S.ButtonsViewBox>
                <ActionButtons
                  onTimeStamp={handleTimeStamp}
                  onImageUriChange={onImageUriChange}
                  onSubmit={handleSubmit}
                />
              </S.ButtonsViewBox>
            </S.TextContentBox>
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
