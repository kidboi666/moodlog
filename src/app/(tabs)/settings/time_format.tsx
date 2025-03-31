import { useApp } from '@/core/store/contexts/app.context';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { TimeFormat } from '@/types/app.types';
import { Container } from '@/core/components/shared/Container.styleable';
import { SettingHeader } from '@/core/components/features/settings/components/SettingHeader';
import { RadioGroup } from 'tamagui';
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem';

export default function Screen() {
  const { timeFormat, onSettingChange } = useApp();
  const { t } = useTranslation();

  const handleValueChange = useCallback(
    (timeFormat: string) => {
      onSettingChange('timeFormat', timeFormat as TimeFormat);
    },
    [onSettingChange],
  );

  return (
    <Container.View Header={<SettingHeader />}>
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
    </Container.View>
  );
}
