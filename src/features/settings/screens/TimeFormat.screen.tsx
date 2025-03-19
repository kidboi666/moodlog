import { Container } from '@/core/components/layouts/containers/Container';
import { SettingHeader } from '@/core/components/layouts/headers/SettingHeader';
import { RadioGroup, Separator, useEvent } from 'tamagui';
import { RadioGroupItem } from '@/core/components/RadioGroupItem';
import { useApp } from '@/core/store/hooks/useApp';
import { useTranslation } from 'react-i18next';
import { TimeFormat } from '@/types/enums';

export const TimeFormatScreen = () => {
  const { timeFormat, onTimeFormatChange } = useApp();
  const { t } = useTranslation();

  const handleValueChange = useEvent((timeFormat: string) => {
    onTimeFormatChange(timeFormat as TimeFormat);
  });

  return (
    <Container>
      <SettingHeader />

      <RadioGroup
        value={timeFormat}
        onValueChange={handleValueChange}
        name="theme"
      >
        <RadioGroupItem
          value={TimeFormat.HOUR_12}
          label={t(`settings.timeFormat.12`)}
          onValueChange={handleValueChange}
        />
        <Separator />
        <RadioGroupItem
          value={TimeFormat.HOUR_24}
          label={t(`settings.timeFormat.24`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container>
  );
};
