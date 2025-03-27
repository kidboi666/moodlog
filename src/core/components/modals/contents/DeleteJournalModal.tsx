import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as S from './DeleteJournalModal.styled';
import { memo } from 'react';

interface Props {
  journalId: string;
  onDelete: (journalId: string) => void;
  closeSheet: () => void;
}

export const DeleteJournalModal = memo(
  ({ journalId, onDelete, closeSheet }: Props) => {
    const { t } = useTranslation();

    const handleConfirmPress = (journalId: string) => {
      onDelete(journalId);
      router.back();
    };

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
          <S.CancelButton onPress={closeSheet}>
            {t('common.button.cancel')}
          </S.CancelButton>
        </S.ModalContentYStack>
      </S.ModalContainer>
    );
  },
);
