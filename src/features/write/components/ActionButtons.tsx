import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import React from 'react';
import { Nullable } from '@/types/utill.types';
import * as S from './ActionButtons.styled';
import { Form, Spinner, XGroup } from 'tamagui';

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
  return (
    <S.XGroupContainer>
      <XGroup.Item>
        <S.ActionButton onPress={onImageUriChange} icon={ImagePlus}>
          사진 추가
        </S.ActionButton>
      </XGroup.Item>
      <S.Separator />
      <XGroup.Item>
        <S.ActionButton onPress={onTimeStamp} icon={Timer}>
          타임 스탬프
        </S.ActionButton>
      </XGroup.Item>
      <S.Separator />
      <XGroup.Item>
        <Form.Trigger asChild>
          <S.SubmitButton
            icon={isSubmitting ? () => <Spinner /> : Check}
            disabled={isDisabled}
          />
        </Form.Trigger>
      </XGroup.Item>
    </S.XGroupContainer>
  );
};
