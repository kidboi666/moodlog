import { H2 } from 'tamagui';
import { getMonthKey } from '@/utils/date';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';

interface Props {
  date: Date;
}

export const CalendarCustomHeader = memo(({ date }: Props) => {
  const month = useMemo(() => {
    return getMonthKey(new Date(date).getMonth());
  }, [date]);
  const { t } = useTranslation();

  return <H2>{t(`calendar.months.${month}`)}</H2>;
});
