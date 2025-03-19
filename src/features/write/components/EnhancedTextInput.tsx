import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { getToken, Input, ScrollView } from 'tamagui';
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ViewFontSize } from '@/types/enums';
import { Nullable } from '@/types/utils';
import * as S from './EnhancedTextInput.styled';

interface EnhancedTextInputProps {
  fontSize: ViewFontSize;
  imageUri?: Nullable<string>;
  contentValue?: string;
  selection: { start: number; end: number };
  onSelectionChange: (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => void;
  onContentChange: (content: string) => void;
  autoFocus?: boolean;
}

export interface EnhancedTextInputRef {
  focus: () => void;
  insertCurrentTime: () => void; // 현재 시간 삽입 기능 추가
}

export const EnhancedTextInput = memo(
  forwardRef<EnhancedTextInputRef, EnhancedTextInputProps>(
    (
      {
        fontSize,
        contentValue,
        onContentChange,
        selection,
        onSelectionChange,
        autoFocus,
        imageUri,
      },
      ref,
    ) => {
      const { t } = useTranslation();
      const firstInputRef = useRef<Input>(null);
      const secondInputRef = useRef<Input>(null);
      // 현재 포커스된 입력란을 추적하는 상태
      const [focusedInput, setFocusedInput] = useState<
        'first' | 'second' | null
      >(null);

      const contentLines = contentValue ? contentValue.split('\n') : [''];
      const firstLine = contentLines[0] || '';
      const restLines = contentLines.slice(1).join('\n');

      // 현재 시간을 가져오는 함수
      const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      // 현재 선택 위치에 시간을 삽입하는 함수
      const insertCurrentTime = () => {
        const currentTime = getCurrentTime();

        // 첫 번째 줄에 포커스가 있는 경우
        if (focusedInput === 'first') {
          // 첫 번째 줄에 시간 삽입
          const newFirstLine =
            firstLine.slice(0, selection.start) +
            currentTime +
            firstLine.slice(selection.end);
          handleTextChange('first', newFirstLine);

          // 시간 삽입 후 커서 위치 조정 (첫 번째 줄은 selection 객체가 직접 전달되지 않으므로 간접적으로 처리)
          setTimeout(() => {
            firstInputRef.current?.focus();
          }, 50);
        } else if (focusedInput === 'second') {
          // 나머지 줄에 시간 삽입
          // TextArea에서는 전체 텍스트 내에서의 상대적인 위치가 필요
          const newRestLines =
            restLines.slice(0, selection.start) +
            currentTime +
            restLines.slice(selection.end);
          handleTextChange('rest', newRestLines);

          // 시간 삽입 후 커서 위치 조정
          const newPosition = selection.start + currentTime.length;

          // 선택 범위를 업데이트하기 위해 이벤트 객체 생성 및 전달
          setTimeout(() => {
            // 새로운 selection 객체 생성
            const newSelection = { start: newPosition, end: newPosition };

            // 부모 컴포넌트에 새 selection 전달
            const fakeEvent = {
              nativeEvent: { selection: newSelection },
            } as NativeSyntheticEvent<TextInputSelectionChangeEventData>;

            onSelectionChange(fakeEvent);
            secondInputRef.current?.focus();
          }, 50);
        } else {
          // 포커스된 입력란이 없는 경우, 두 번째 입력란에 시간 삽입
          const newRestLines = restLines
            ? restLines + currentTime
            : currentTime;
          handleTextChange('rest', newRestLines);

          setTimeout(() => {
            secondInputRef.current?.focus();
          }, 50);
        }
      };

      const handleTextChange = (type: 'first' | 'rest', text: string) => {
        if (type === 'first') {
          // 첫 번째 줄이 변경된 경우
          onContentChange(text + (restLines ? '\n' + restLines : ''));
        } else {
          // 나머지 줄이 변경된 경우
          onContentChange(firstLine + '\n' + text);
        }
      };

      const handleSubmitEditing = () => {
        moveToNextLine();
      };

      // 다음 줄로 이동하는 공통 함수
      const moveToNextLine = () => {
        // 엔터 키가 눌렸을 때, 개행 문자를 추가하여 다음 줄로 이동
        const newContent = firstLine + '\n' + restLines;
        onContentChange(newContent);

        // 다음 포커스가 이동되기 전에 약간 딜레이를 줘서 컨텐츠 업데이트가 된 후 포커스 되도록 함
        setTimeout(() => {
          setFocusedInput('second');
          secondInputRef.current?.focus();
        }, 50);
      };

      // 외부에서 focus와 insertCurrentTime 호출할 수 있도록
      useImperativeHandle(ref, () => ({
        focus: () => {
          if (firstLine === '') {
            // 첫 줄이 비어있으면 첫 번째 입력 상자에 포커스
            setFocusedInput('first');
            firstInputRef.current?.focus();
          } else {
            // 첫 줄이 있으면 두 번째 입력 상자에 포커스
            setFocusedInput('second');
            secondInputRef.current?.focus();
          }
        },
        insertCurrentTime, // 현재 시간 삽입 함수 노출
      }));

      return (
        <ScrollView>
          <S.InputContainer>
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}

            {/* 첫 번째 줄 (큰 글씨) */}
            <S.Input
              ref={firstInputRef}
              value={firstLine}
              onChangeText={text => handleTextChange('first', text)}
              onSubmitEditing={handleSubmitEditing}
              onFocus={() => setFocusedInput('first')}
              onBlur={() => setFocusedInput(null)}
              returnKeyType="next"
              fontSize={getToken(fontSize) * 2}
              placeholder={t('placeholders.journal.title')}
              autoFocus={autoFocus}
            />

            {/* 두 번째 줄부터 (작은 글씨) */}
            <S.TextArea
              ref={secondInputRef}
              value={restLines}
              selection={selection}
              onSelectionChange={event => onSelectionChange(event)}
              onFocus={() => setFocusedInput('second')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={text => handleTextChange('rest', text)}
              fontSize={fontSize}
              placeholder={t('placeholders.journal.content')}
            />
          </S.InputContainer>
        </ScrollView>
      );
    },
  ),
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
