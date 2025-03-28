import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';
import { useRouter } from 'expo-router';
import * as S from './JournalHeader.styled';
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons';
import { Journal } from '@/types/journal.types';
import { BottomSheet } from '@/core/components/modals/BottomSheet';
import { useBottomSheet } from '@/core/hooks/useBottomSheet';
import { useCallback } from 'react';

interface Props {
  journal: Journal;
  onDelete: (journalId: string) => void;
}

export const JournalHeader = ({ journal, onDelete }: Props) => {
  const router = useRouter();
  const { isOpen, setIsOpen, openSheet, closeSheet } = useBottomSheet();

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <S.HeaderContainer>
        <S.BackButton icon={ArrowLeft} onPress={handleGoBack} />
        <S.DateContainer>
          <S.DateText localDate={journal.localDate} />
          <S.DayWithTimeBox>
            <S.DayText createdAt={journal.createdAt} />
            <S.TimeText createdAt={journal.createdAt} />
          </S.DayWithTimeBox>
        </S.DateContainer>

        <S.DeleteButton icon={Trash2} onPress={openSheet} />
      </S.HeaderContainer>

      <BottomSheet {...{ isOpen, setIsOpen }}>
        <DeleteJournalModal
          journalId={journal.id}
          onDelete={onDelete}
          closeSheet={closeSheet}
          callback={handleGoBack}
        />
      </BottomSheet>
    </>
  );
};
