import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ScrollView } from 'tamagui';
import { Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/types/common.types';
import * as S from './EnhancedTextInput.styled';

interface Props {
  imageUri?: Nullable<string>;
  contentValue?: string;
  onContentChange: (content: string) => void;
  autoFocus?: boolean;
}

export interface EnhancedTextInputRef {
  insertCurrentTime: () => void;
}

export const EnhancedTextInput = forwardRef<EnhancedTextInputRef, Props>(
  ({ contentValue, onContentChange, imageUri }, ref) => {
    const { t } = useTranslation();
    const [localContent, setLocalContent] = useState(contentValue || '');
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const insertCurrentTime = () => {
      const currentTime = getCurrentTime();

      const newContent =
        localContent.slice(0, selection.start) +
        currentTime +
        localContent.slice(selection.end);
      handleTextChange(newContent);
      const newPosition = selection.start + currentTime.length;
      setSelection({ start: newPosition, end: newPosition });
      onContentChange(newContent);
    };

    const handleTextChange = (text: string) => {
      setLocalContent(text);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        onContentChange(localContent);
      }, 300);
    };

    useImperativeHandle(ref, () => ({
      insertCurrentTime,
    }));

    return (
      <ScrollView>
        <S.InputContainer>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}

          <S.TextArea
            value={localContent}
            onChangeText={handleTextChange}
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

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
    borderRadius: 12,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
