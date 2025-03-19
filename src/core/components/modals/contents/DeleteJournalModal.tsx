import React, { useCallback } from 'react';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useJournal } from '@/core/store/hooks/useJournal';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as S from './DeleteJournalModal.styled';

interface Props {
  journalId: string;
}

export const DeleteJournalModal = ({ journalId }: Props) => {
  const { dismissAll } = useBottomSheetModal();
  const { removeJournal } = useJournal();
  const { t } = useTranslation();

  const handleConfirmPress = useCallback(
    (journalId: string) => {
      removeJournal(journalId);
      router.back();
      dismissAll();
    },
    [removeJournal, router, dismissAll],
  );

  return (
    <S.ModalContainer>
      <S.ModalTitle>{t('modals.deleteJournal.title')}</S.ModalTitle>
      <S.ModalDescription>
        {t('modals.deleteJournal.description')}
      </S.ModalDescription>
      <S.ModalContentYStack>
        <S.ConfirmButton onPress={() => handleConfirmPress(journalId)}>
          {t('common.button.delete')}
        </S.ConfirmButton>
        <S.CancelButton onPress={() => dismissAll()}>
          {t('common.button.cancel')}
        </S.CancelButton>
      </S.ModalContentYStack>
    </S.ModalContainer>
  );
};
