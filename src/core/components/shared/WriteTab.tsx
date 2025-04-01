import * as S from '@/core/components/shared/CustomTabBar.styled';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Plus } from '@tamagui/lucide-icons';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import {
  JOURNAL_WRITE_SNAP_POINTS,
  SELECT_MOOD_SNAP_POINTS,
} from '@/core/constants/size';
import { Mood } from '@/types/mood.types';
import { useJournal } from '@/core/store/contexts/journal.context';
import { Draft } from '@/types/journal.types';
import { useToastController } from '@tamagui/toast';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export const WriteTab = memo(() => {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { addJournal, isLoading } = useJournal();
  const toast = useToastController();
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleIsSubmittedChange = useCallback((bool: boolean) => {
    setIsSubmitted(bool);
  }, []);

  const handleSubmit = useCallback(
    async (draft: Draft) => {
      await addJournal(draft);
      toast.show(t('notifications.success.journal.title'), {
        message: t('notifications.success.journal.message'),
        preset: 'success',
      });
      handleIsSubmittedChange(true);
    },
    [toast, addJournal, handleIsSubmittedChange],
  );

  const handleWriteButtonPress = useCallback(() => {
    showBottomSheet(BottomSheetType.SELECT_MOOD, SELECT_MOOD_SNAP_POINTS, {
      onPress: (mood: Mood) => {
        if (!mood) return null;

        showBottomSheet(
          BottomSheetType.JOURNAL_WRITE,
          JOURNAL_WRITE_SNAP_POINTS,
          {
            moodType: mood.type,
            moodLevel: mood.level,
            onSubmit: handleSubmit,
            isLoading,
            isSubmitted,
          },
        );
      },
    });
  }, [showBottomSheet]);

  useEffect(() => {
    if (isSubmitted) {
      hideBottomSheet();
    }
  }, [isSubmitted]);

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
