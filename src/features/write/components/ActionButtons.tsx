import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import React, { memo } from 'react';
import { Nullable } from '@/types/common.types';
import * as S from './ActionButtons.styled';
import { Button, Form, XGroup } from 'tamagui';

interface Props {
  onImageUriChange: () => Promise<Nullable<void>>;
  onTimeStamp: () => void;
}

export const ActionButtons = memo(
  ({ onImageUriChange, onTimeStamp }: Props) => {
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
            <Button icon={Check} />
          </Form.Trigger>
        </XGroup.Item>
      </S.XGroupContainer>
    );
  },
);
