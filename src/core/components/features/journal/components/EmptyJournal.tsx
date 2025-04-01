import { NotebookPen } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import * as S from './EmptyJournal.styled';
import { memo } from 'react';
import { WriteButtonWithEvent } from '@/core/components/shared/WriteButtonWithEvent';

interface Props {
  isToday: boolean;
}

export const EmptyJournal = memo(({ isToday }: Props) => {
  const { t } = useTranslation();
  const toast = useToastController();

  return isToday ? (
    <S.TodayContainer>
      <S.TodayTitle>{t('common.fallback.today')}</S.TodayTitle>
      <WriteButtonWithEvent />
    </S.TodayContainer>
  ) : (
    <S.PastDaysContainer
      onPress={() =>
        toast.show(t('notifications.warning.journal.title'), {
          preset: 'error',
        })
      }
    >
      <NotebookPen size="$1" color="$gray10" />
      <S.PastDaysTitle>{t('common.fallback.empty.title')}</S.PastDaysTitle>
      <S.PastDaysDescription>
        {t('common.fallback.empty.description')}
      </S.PastDaysDescription>
    </S.PastDaysContainer>
  );
});
