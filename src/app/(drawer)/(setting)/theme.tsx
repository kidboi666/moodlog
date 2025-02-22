import { Container } from '@/components/containers/Container';
import { useTranslation } from 'react-i18next';
import { RadioGroup, Separator } from 'tamagui';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { Theme } from 'src/types/enums';
import { RadioGroupItem } from '@/components/RadioGroupItem';

export default function ThemeScreen() {
  const { currentTheme, changeTheme } = useAppTheme();
  const { t } = useTranslation();

  const handleValueChange = (value: string) => {
    changeTheme(value as Theme);
  };

  return (
    <Container>
      <RadioGroup
        value={currentTheme}
        onValueChange={handleValueChange}
        name="theme"
      >
        <RadioGroupItem
          value="system"
          label={t(`setting.theme.system`)}
          onValueChange={handleValueChange}
        />
        <Separator />
        <RadioGroupItem
          value="dark"
          label={t(`setting.theme.dark`)}
          onValueChange={handleValueChange}
        />
        <Separator />
        <RadioGroupItem
          value="light"
          label={t(`setting.theme.light`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container>
  );
}
