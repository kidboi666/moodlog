import { Container } from '@/core/components/layouts/containers/Container';
import { useTranslation } from 'react-i18next';
import { RadioGroup, Separator, useEvent } from 'tamagui';
import { useAppTheme } from '@/core/store/hooks/useAppTheme';
import { Theme } from 'src/types/enums';
import { RadioGroupItem } from '@/core/components/RadioGroupItem';
import { SettingHeader } from '@/core/components/layouts/headers/SettingHeader';

export const ThemeScreen = () => {
  const { currentTheme, changeTheme } = useAppTheme();
  const { t } = useTranslation();

  const handleValueChange = useEvent((value: string) => {
    changeTheme(value as Theme);
  });

  return (
    <Container>
      <SettingHeader />

      <RadioGroup
        value={currentTheme}
        onValueChange={handleValueChange}
        name="theme"
      >
        <RadioGroupItem
          value="system"
          label={t(`settings.theme.system`)}
          onValueChange={handleValueChange}
        />
        <Separator />
        <RadioGroupItem
          value="dark"
          label={t(`settings.theme.dark`)}
          onValueChange={handleValueChange}
        />
        <Separator />
        <RadioGroupItem
          value="light"
          label={t(`settings.theme.light`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container>
  );
};
