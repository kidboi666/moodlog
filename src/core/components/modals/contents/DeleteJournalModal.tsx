import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as S from './DeleteJournalModal.styled';

interface Props {
  journalId: string;
  onDelete: (journalId: string) => void;
}

export const DeleteJournalModal = ({ journalId, onDelete }: Props) => {
  const { dismissAll } = useBottomSheetModal();
  const { t } = useTranslation();

  const handleConfirmPress = (journalId: string) => {
    onDelete(journalId);
    router.back();
    dismissAll();
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
        <S.CancelButton onPress={() => dismissAll()}>
          {t('common.button.cancel')}
        </S.CancelButton>
      </S.ModalContentYStack>
    </S.ModalContainer>
  );
};
