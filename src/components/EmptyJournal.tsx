import { NotebookPen, Plus } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import * as S from './EmptyJournal.styled';
import { memo } from 'react';
import { useRouter } from 'expo-router';

interface Props {
  isToday: boolean;
}

export const EmptyJournal = memo(({ isToday }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToastController();

  return isToday ? (
    <S.TodayContainer>
      <S.TodayTitle>{t('common.fallback.today')}</S.TodayTitle>
      <S.WriteButton
        icon={Plus}
        onPress={() => router.push('/(tabs)/write/mood_select')}
      />
    </S.TodayContainer>
  ) : (
    <S.PastDaysContainer
      onPress={() => toast.show(t('notifications.warning.journal.title'))}
    >
      <NotebookPen size="$1" color="$gray10" />
      <S.PastDaysTitle>{t('common.fallback.empty.title')}</S.PastDaysTitle>
      <S.PastDaysDescription>
        {t('common.fallback.empty.description')}
      </S.PastDaysDescription>
    </S.PastDaysContainer>
  );
});
