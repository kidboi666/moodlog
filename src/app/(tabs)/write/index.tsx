import { useLocalSearchParams, useRouter } from 'expo-router';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { useTheme } from 'tamagui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Draft } from '@/types/journal.types';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as S from '@/styles/screens/write/JournalWrite.styled';
import { WriteHeader } from '@/core/components/features/write/components/WriteHeader';
import { InputContainer } from '@/core/components/features/write/components/InputContainer';

const initialDraft: Draft = {
  content: '',
  mood: undefined,
  imageUri: '',
};

export default function Screen() {
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
      router.replace('/entries');
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
      style={{ flex: 1 }}
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
}
