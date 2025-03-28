import { useTranslation } from 'react-i18next';
import * as S from './DeleteJournalModal.styled';
ㅋimport { memo, useState } from 'react';
import { Spinner } from 'tamagui';
import { useToastController } from '@tamagui/toast';

interface Props {
  journalId: string;
  onDelete: (id: string) => Promise<void>;
  onDeleteSuccess?: () => void;
  closeSheet: () => void;
}

export const DeleteJournalModal = memo(
  ({ journalId, onDelete, onDeleteSuccess, closeSheet }: Props) => {
    const toast = useToastController();
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useTranslation();

    const handleDelete = async () => {
      try {
        setIsDeleting(true);
        await onDelete(journalId);
        closeSheet();
        toast.show(t('notifications.success.delete'), {
          preset: 'notice',
        });
        onDeleteSuccess?.();
      } finally {
        setIsDeleting(false);
      }
    };

    return (
      <S.ModalContainer>
        <S.ModalTitle>{t('modals.deleteJournal.title')}</S.ModalTitle>
        <S.ModalDescription>
          {t('modals.deleteJournal.description')}
        </S.ModalDescription>
        <S.ModalContentYStack>
          <S.ConfirmButton
            icon={isDeleting ? () => <Spinner /> : null}
            disabled={isDeleting}
            onPress={handleDelete}
          >
            {t('common.button.delete')}
          </S.ConfirmButton>
          <S.CancelButton onPress={closeSheet} disabled={isDeleting}>
            {t('common.button.cancel')}
          </S.CancelButton>
        </S.ModalContentYStack>
      </S.ModalContainer>
    );
  },
);
