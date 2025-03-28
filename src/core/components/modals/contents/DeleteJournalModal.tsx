import { useTranslation } from 'react-i18next';
import * as S from './DeleteJournalModal.styled';
import { Spinner } from 'tamagui';
import { useJournal } from '@/core/store/contexts/journal.context';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  journalId: string;
  onDeleteSuccess?: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteJournalModal = ({
  journalId,
  onDeleteSuccess,
  setOpen,
}: Props) => {
  const { removeJournal, isLoading } = useJournal();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await removeJournal(journalId);
    onDeleteSuccess?.();
  };

  return (
    <S.ModalContainer>
      <S.ModalTitle>{t('modals.deleteJournal.title')}</S.ModalTitle>
      <S.ModalDescription>
        {t('modals.deleteJournal.description')}
      </S.ModalDescription>
      <S.ModalContentYStack>
        <S.ConfirmButton
          icon={isLoading ? () => <Spinner /> : null}
          disabled={isLoading}
          onPress={handleDelete}
        >
          {t('common.button.delete')}
        </S.ConfirmButton>
        <S.CancelButton onPress={() => setOpen(false)} disabled={isLoading}>
          {t('common.button.cancel')}
        </S.CancelButton>
      </S.ModalContentYStack>
    </S.ModalContainer>
  );
};
