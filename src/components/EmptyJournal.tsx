import { NotebookPen, Plus } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { ISODateString } from '@/types/dtos/date';
import { CalendarUtils } from 'react-native-calendars';
import { useToastController } from '@tamagui/toast';
import * as S from './EmptyJournal.styled';
import { memo } from 'react';

interface Props {
  date: ISODateString;
}

export const EmptyJournal = memo(({ date }: Props) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const isToday = CalendarUtils.getCalendarDateString(new Date()) === date;

  return isToday ? (
    <S.TodayContainer key={date}>
      <S.TodayTitle>{t('common.fallback.today')}</S.TodayTitle>
      <S.WriteButton
        icon={Plus}
        onPress={() => router.push('/(tabs)/write/mood_select')}
      />
    </S.TodayContainer>
  ) : (
    <S.PastDaysContainer
      key={date}
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
