import { Container } from '@/core/components/Container.styleable';
import { RadioGroup, Separator, useEvent } from 'tamagui';
import { useApp } from '@/core/store/hooks/useApp';
import { RadioGroupItem } from '@/core/components/RadioGroupItem';
import { SettingHeader } from '@/features/settings/components/SettingHeader';

import { Languages } from '@/types/app.types';

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
