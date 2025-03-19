import { useJournal } from '@/core/store/hooks/useJournal';
import React from 'react';
import { BottomModal } from '@/core/components/modals/BottomModal';
import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';
import { useRouter } from 'expo-router';
import { useBottomModal } from '@/core/hooks/useBottomModal';
import * as S from './JournalHeader.styled';
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons';

export default function JournalHeader() {
  const router = useRouter();
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
