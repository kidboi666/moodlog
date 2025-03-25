import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import React from 'react';
import { Nullable } from '@/types/common.types';
import * as S from './ActionButtons.styled';
import { Button, Form, Spinner, XGroup } from 'tamagui';

interface Props {
  onImageUriChange: () => Promise<Nullable<void>>;
  onTimeStamp: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  content: string;
}

export const ActionButtons = ({
  onImageUriChange,
  onTimeStamp,
  isSubmitted,
  isSubmitting,
  content,
}: Props) => {
  const isDisabled = isSubmitted || isSubmitting || !content;
  console.log('isDisabled', isDisabled);
  return (
    <S.XGroupContainer>
      <XGroup.Item>
        <Button onPress={onImageUriChange} icon={ImagePlus}>
          사진 추가
        </Button>
      </XGroup.Item>
      <S.Separator />
      <XGroup.Item>
        <Button onPress={onTimeStamp} icon={Timer}>
          타임 스탬프
        </Button>
      </XGroup.Item>
      <S.Separator />
      <XGroup.Item>
        <Form.Trigger asChild>
          <S.SubmitButton
            icon={isSubmitting ? () => <Spinner /> : Check}
            disabled={isDisabled}
            isDisabled={isDisabled}
          />
        </Form.Trigger>
      </XGroup.Item>
    </S.XGroupContainer>
  );
};
