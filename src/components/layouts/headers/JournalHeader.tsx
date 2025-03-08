import { useJournal } from '@/store/hooks/useJournal';
import React from 'react';
import { BottomModal } from '@/components/modals/BottomModal';
import { DeleteJournalModal } from '@/components/modals/contents/DeleteJournalModal';
import { router } from 'expo-router';
import { useBottomModal } from '@/hooks/useBottomModal';
import * as S from './JournalHeader.styled';
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons';

export default function JournalHeader() {
  const { selectedJournal } = useJournal();
  const { modalRef, openModal } = useBottomModal();

  if (!selectedJournal) return null;

  return (
    <>
      <S.HeaderContainer>
        <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
        <S.DateContainer>
          <S.DateText localDate={selectedJournal.localDate} />
          <S.DayWithTimeBox>
            <S.DayText createdAt={selectedJournal.createdAt} />
            <S.TimeText createdAt={selectedJournal.createdAt} />
          </S.DayWithTimeBox>
        </S.DateContainer>

        <S.DeleteButton icon={Trash2} onPress={openModal} />
      </S.HeaderContainer>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={selectedJournal.id} />
      </BottomModal>
    </>
  );
}
