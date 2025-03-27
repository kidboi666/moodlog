import { Container } from '@/core/components/Container.styleable';
import { SettingHeader } from '@/features/settings/components/SettingHeader';
import { RadioGroup } from 'tamagui';
import { RadioGroupItem } from '@/core/components/RadioGroupItem';
import { useTranslation } from 'react-i18next';

import { TimeFormat } from '@/types/app.types';
import { useApp } from '@/core/store/contexts/app.context';
import { useCallback } from 'react';

export const TimeFormatScreen = () => {
  const { timeFormat, onSettingChange } = useApp();
  const { t } = useTranslation();

  const handleValueChange = useCallback(
    (timeFormat: string) => {
      onSettingChange('timeFormat', timeFormat as TimeFormat);
    },
    [onSettingChange],
  );

  return (
    <Container Header={<SettingHeader />}>
      <RadioGroup
        value={timeFormat}
        onValueChange={handleValueChange}
        name="theme"
        gap="$4"
      >
        <RadioGroupItem
          value={TimeFormat.HOUR_12}
          label={t(`settings.timeFormat.12`)}
          onValueChange={handleValueChange}
        />
        <RadioGroupItem
          value={TimeFormat.HOUR_24}
          label={t(`settings.timeFormat.24`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container>
  );
};
