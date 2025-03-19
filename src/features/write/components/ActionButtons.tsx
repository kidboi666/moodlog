import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import React, { memo } from 'react';
import { Nullable } from '@/core/types/common.types';
import * as S from './ActionButtons.styled';
import { Button, XGroup } from 'tamagui';

interface Props {
  onImageUriChange: () => Promise<Nullable<void>>;
  onTimeStamp: () => void;
  onSubmit: () => void;
}

export const ActionButtons = memo(
  ({ onImageUriChange, onTimeStamp, onSubmit }: Props) => {
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
          <Button onPress={onSubmit} icon={Check} />
        </XGroup.Item>
      </S.XGroupContainer>
    );
  },
);
