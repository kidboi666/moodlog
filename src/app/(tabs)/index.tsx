import React, { useCallback, useEffect } from 'react';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useUser } from '@/core/store/contexts/user.context';
import { useToastController } from '@tamagui/toast';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { useTranslation } from 'react-i18next';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import * as S from '@/styles/screens/home/Home.styled';
import { ScrollView } from 'tamagui';
import { WeekDay } from '@/core/components/features/home/components/WeekDay';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';
import { HomeJournalCard } from '@/core/components/features/home/components/HomeJournalCard';
import { WelcomeZone } from '@/core/components/features/home/components/WelcomeZone';
import { AiPromptZone } from '@/core/components/features/home/components/AiPromptZone';

export default function Screen() {
  const { selectedJournals, selectJournals, isLoading, removeJournal } =
    useJournal();
  const { isToday, selectedDate } = useCalendar();
  const { userInfo } = useUser();
  const toast = useToastController();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { t } = useTranslation();

  const handleDeletePress = useCallback(
    (id: string) => {
      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        {
          journalId: id,
          isLoading,
          onDelete: removeJournal,
          hideBottomSheet,
          onSuccess: () => {
            selectJournals(selectedDate);
            toast.show(t('notifications.success.delete'));
          },
        },
      );
    },
    [
      showBottomSheet,
      isLoading,
      removeJournal,
      selectJournals,
      selectedDate,
      toast,
    ],
  );

  useEffect(() => {
    selectJournals(selectedDate);
  }, [selectJournals]);

  const { userName } = userInfo || '';

  return (
    <ScrollView overScrollMode="always">
      <ViewContainer edges={['top', 'bottom']} padded>
        <S.ContentHeaderContainer>
          <WelcomeZone userName={userName} />
          <WeekDay />

          <HomeJournalCard
            journals={selectedJournals}
            onDeletePress={handleDeletePress}
            isToday={isToday}
          />
          <AiPromptZone />
        </S.ContentHeaderContainer>
      </ViewContainer>
    </ScrollView>
  );
}
