import React, { memo } from 'react';
import { BottomModal } from '@/core/components/modals/BottomModal';
import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';
import { useRouter } from 'expo-router';
import { useBottomModal } from '@/core/hooks/useBottomModal';
import * as S from './JournalHeader.styled';
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons';
import { Journal } from '@/types/journal.types';

interface Props {
  journal: Journal;
  onDelete: (journalId: string) => void;
}

export const JournalHeader = memo(({ journal, onDelete }: Props) => {
  const router = useRouter();
  const { modalRef, openModal } = useBottomModal();

  return (
    <>
      <S.HeaderContainer>
        <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
        <S.DateContainer>
          <S.DateText localDate={journal.localDate} />
          <S.DayWithTimeBox>
            <S.DayText createdAt={journal.createdAt} />
            <S.TimeText createdAt={journal.createdAt} />
          </S.DayWithTimeBox>
        </S.DateContainer>

        <S.DeleteButton icon={Trash2} onPress={openModal} />
      </S.HeaderContainer>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={journal.id} onDelete={onDelete} />
      </BottomModal>
    </>
  );
});
