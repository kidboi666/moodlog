import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/types/utill.types';
import * as S from './EnhancedTextInput.styled';

interface Props {
  imageUri?: Nullable<string>;
  contentValue: string;
  onContentChange: (content: string) => void;
  autoFocus?: boolean;
}

export interface EnhancedTextInputRef {
  insertCurrentTime: () => void;
}

export const EnhancedTextInput = forwardRef<EnhancedTextInputRef, Props>(
  ({ contentValue, onContentChange, imageUri }, ref) => {
    const { t } = useTranslation();
    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const insertCurrentTime = () => {
      const currentTime = getCurrentTime();

      const newContent =
        contentValue.slice(0, selection.start) +
        currentTime +
        contentValue.slice(selection.end);
      const newPosition = selection.start + currentTime.length;
      setSelection({ start: newPosition, end: newPosition });
      onContentChange(newContent);
    };

    useImperativeHandle(ref, () => ({
      insertCurrentTime,
    }));

    return (
      <ScrollView>
        <S.InputContainer>
          {imageUri && <S.Image source={{ uri: imageUri }} />}

          <S.TextArea
            value={contentValue}
            onChangeText={onContentChange}
            onSelectionChange={event =>
              setSelection(event.nativeEvent.selection)
            }
            placeholder={t('placeholders.journal.content')}
          />
        </S.InputContainer>
      </ScrollView>
    );
  },
);
