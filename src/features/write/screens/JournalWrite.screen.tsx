import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { WriteHeader } from '@/features/write/components/WriteHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as S from './JournalWrite.styled';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { InputContainer } from '../components/InputContainer';
import { useTheme } from 'tamagui';
import { Draft } from '@/types/journal.types';

const initialDraft: Draft = {
  content: '',
  mood: undefined,
  imageUri: '',
};

export const JournalWriteScreen = () => {
  const params = useLocalSearchParams<{ type: MoodType; level: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draft, setDraft] = useState<Draft>(initialDraft);

  const moodType = params.type as MoodType;
  const moodLevel = params.level as MoodLevel;

  const handleIsSubmittedChange = useCallback((bool: boolean) => {
    setIsSubmitted(bool);
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  const handleImageUriChange = useCallback((uri: string) => {
    setDraft(prev => ({ ...prev, imageUri: uri }));
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      router.push('/');
    }

    return () => {
      setDraft(initialDraft);
    };
  }, [isSubmitted]);

  useEffect(() => {
    setDraft(prev => ({
      ...prev,
      mood: {
        type: moodType,
        level: moodLevel,
      },
    }));
  }, []);

  const contentContainerStyle = useMemo(
    () => ({
      backgroundColor: theme.red5.val,
    }),
    [theme.red5.val],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={contentContainerStyle}
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
          <InputContainer
            isSubmitted={isSubmitted}
            onIsSubmittedChange={handleIsSubmittedChange}
            onContentChange={handleContentChange}
            onImageUriChange={handleImageUriChange}
            content={draft.content}
            imageUri={draft.imageUri ?? null}
            mood={draft?.mood}
          />
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
