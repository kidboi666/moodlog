import { useTranslation } from 'react-i18next';
import * as S from './DeleteJournalModal.styled';
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Spinner } from 'tamagui';

interface Props {
  journalId: string;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
  onDeleteSuccess?: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteJournalModal = memo(
  ({ journalId, onDelete, isLoading, onDeleteSuccess, setOpen }: Props) => {
    const { t } = useTranslation();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDelete = useCallback(async () => {
      await onDelete(journalId);
      setOpen(false);
      setIsSuccess(true);
    }, [onDelete, journalId]);

    useEffect(() => {
      if (isSuccess) {
        onDeleteSuccess?.();
      }

      return () => {
        setIsSuccess(false);
      };
    }, [isSuccess]);

    const isDisabled = useMemo(
      () => isLoading || isSuccess,
      [isLoading, isSuccess],
    );

    return (
      <S.ModalContainer>
        <S.ModalTitle>{t('modals.deleteJournal.title')}</S.ModalTitle>
        <S.ModalDescription>
          {t('modals.deleteJournal.description')}
        </S.ModalDescription>
        <S.ModalContentYStack>
          <S.ConfirmButton
            onPress={handleDelete}
            icon={isDisabled ? () => <Spinner /> : null}
            disabled={isDisabled}
          >
            {t('common.button.delete')}
          </S.ConfirmButton>
          <S.CancelButton onPress={() => setOpen(false)} disabled={isDisabled}>
            {t('common.button.cancel')}
          </S.CancelButton>
        </S.ModalContentYStack>
      </S.ModalContainer>
    );
  },
);
