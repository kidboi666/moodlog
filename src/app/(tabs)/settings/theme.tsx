import { useAppTheme } from '@/core/store/contexts/theme.context';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Theme } from '@/types/app.types';
import { Container } from '@/core/components/shared/Container.styleable';
import { SettingHeader } from '@/core/components/features/settings/components/SettingHeader';
import { RadioGroup } from 'tamagui';
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem';

export default function Screen() {
  const { currentTheme, changeTheme } = useAppTheme();
  const { t } = useTranslation();

  const handleValueChange = useCallback(
    (value: string) => {
      changeTheme(value as Theme);
    },
    [changeTheme],
  );

  return (
    <Container.View Header={<SettingHeader />}>
      <RadioGroup
        value={currentTheme}
        onValueChange={handleValueChange}
        name="theme"
        gap="$4"
      >
        <RadioGroupItem
          value="system"
          label={t(`settings.theme.system`)}
          onValueChange={handleValueChange}
        />
        <RadioGroupItem
          value="dark"
          label={t(`settings.theme.dark`)}
          onValueChange={handleValueChange}
        />
        <RadioGroupItem
          value="light"
          label={t(`settings.theme.light`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container.View>
  );
}
