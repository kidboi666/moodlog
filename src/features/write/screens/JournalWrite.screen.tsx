import React, { useState } from 'react';
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
import { EnhancedTextInput } from '@/features/write/components/EnhancedTextInput';
import { WriteHeader } from '@/features/write/components/WriteHeader';
import { ActionButtons } from '@/features/write/components/ActionButtons';
import { useRouter } from 'expo-router';
import * as S from './JournalWrite.styled';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useApp } from '@/core/store/contexts/app.context';
import { useDraft } from '@/core/store/contexts/draft.context';

export const JournalWriteScreen = () => {
  const router = useRouter();
  const { fontSize } = useApp();
  const {
    draft,
    onContentChange,
    onTimeStamp,
    onSelectionChange,
    selection,
    onImageUriChange,
    enhancedInputRef,
  } = useDraft();
  const { addJournal } = useJournal('week');
  const toast = useToastController();
  const { t } = useTranslation();
  const theme = useTheme();
  const [inputKey, setInputKey] = useState(0);

  const handleSubmit = () => {
    addJournal(draft);
    toast.show(t('notifications.success.journal.title'), {
      message: t('notifications.success.journal.message'),
    });
    router.push('/');
  };

  const triggerFocus = () => {
    if (enhancedInputRef.current) {
      enhancedInputRef.current.focus();
    } else {
      setInputKey(prev => prev + 1);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={{ backgroundColor: theme.red5.val }}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -40 : 0}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={triggerFocus}
      >
        <S.ViewContainer
          edges={['bottom']}
          Header={
            <S.HeaderWrapper>
              <WriteHeader />
            </S.HeaderWrapper>
          }
        >
          <S.XStackContainer>
            {draft.mood ? (
              <S.ColoredMoodBar
                moodColor={moodTheme[draft.mood?.type][draft.mood?.level]}
              />
            ) : (
              <S.UncoloredMoodBar />
            )}
            <S.TextContentBox>
              <EnhancedTextInput
                key={inputKey}
                ref={enhancedInputRef}
                imageUri={draft.imageUri}
                fontSize={fontSize}
                contentValue={draft.content}
                onContentChange={onContentChange}
                selection={selection}
                onSelectionChange={onSelectionChange}
                autoFocus={true}
              />
              <S.ButtonsViewBox>
                <ActionButtons
                  onTimeStamp={onTimeStamp}
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
