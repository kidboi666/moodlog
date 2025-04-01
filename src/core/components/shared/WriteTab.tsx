import * as S from '@/core/components/shared/CustomTabBar.styled';
import React, { memo, useCallback } from 'react';
import { Plus } from '@tamagui/lucide-icons';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import { SELECT_MOOD_SNAP_POINTS } from '@/core/constants/size';

export const WriteTab = memo(() => {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const handleWriteButtonPress = useCallback(() => {
    showBottomSheet(BottomSheetType.SELECT_MOOD, SELECT_MOOD_SNAP_POINTS, {});
  }, [showBottomSheet]);

  return (
    <S.WriteTabContainer>
      <S.WriteButton onPress={handleWriteButtonPress}>
        <S.IconBox>
          <Plus size="$1" color="$color1" />
        </S.IconBox>
      </S.WriteButton>
    </S.WriteTabContainer>
  );
});
