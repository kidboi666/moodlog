import { Container } from '@/core/components/layouts/containers/Container';
import { RadioGroup, Separator, useEvent } from 'tamagui';
import { useApp } from '@/core/store/hooks/useApp';
import { RadioGroupItem } from '@/core/components/RadioGroupItem';
import { Languages } from '@/types/enums';
import { SettingHeader } from '@/core/components/layouts/headers/SettingHeader';

export const LanguageScreen = () => {
  const { language, onLanguageChange } = useApp();

  const handleValueChange = useEvent((language: string) => {
    onLanguageChange(language as Languages);
  });

  return (
    <Container Header={<SettingHeader />}>
      <RadioGroup
        value={language}
        onValueChange={handleValueChange}
        name="theme"
      >
        {/* English */}
        <RadioGroupItem
          value="en"
          label="English"
          onValueChange={handleValueChange}
        />
        <Separator />

        {/* 한국어 */}
        <RadioGroupItem
          value="ko"
          label="한국어"
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container>
  );
};
