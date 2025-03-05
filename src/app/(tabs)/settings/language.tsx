import { Container } from '@/components/layouts/containers/Container';
import { RadioGroup, Separator } from 'tamagui';
import { useApp } from '@/store/hooks/useApp';
import { RadioGroupItem } from '@/components/RadioGroupItem';
import { useCallback } from 'react';
import { Languages } from '@/types/enums';
import { SettingHeader } from '@/components/layouts/headers/SettingHeader';

export default function LanguageScreen() {
  const { language, onChangeLanguage } = useApp();

  const handleValueChange = useCallback((language: string) => {
    onChangeLanguage(language as Languages);
  }, []);

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
}
