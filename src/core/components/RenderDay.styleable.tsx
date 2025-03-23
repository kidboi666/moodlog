import { Text, TextProps } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { WEEK_DAY } from '@/core/constants/date';

interface Props extends TextProps {
  createdAt: string;
}

export const RenderDay = Text.styleable<Props>(
  ({ createdAt, ...props }, ref) => {
    const { t } = useTranslation();
    const day = new Date(createdAt);

    return (
      <Text ref={ref} {...props}>
        {t(`calendar.days.${Object.keys(WEEK_DAY)[day.getDay()]}`)}
        {t(`common.units.day`)}
      </Text>
    );
  },
);

RenderDay.displayName = 'RenderDay';
