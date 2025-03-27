import { Container } from '@/core/components/Container.styleable';
import { RadioGroup } from 'tamagui';
import { RadioGroupItem } from '@/core/components/RadioGroupItem';
import { SettingHeader } from '@/features/settings/components/SettingHeader';

import { Languages } from '@/types/app.types';
import { useApp } from '@/core/store/contexts/app.context';
import { useCallback } from 'react';

export const LanguageScreen = () => {
  const { language, onSettingChange } = useApp();

  const handleValueChange = useCallback(
    (language: string) => {
      onSettingChange('language', language as Languages);
    },
    [onSettingChange],
  );

  return (
    <Container Header={<SettingHeader />}>
      <RadioGroup
        value={language}
        onValueChange={handleValueChange}
        name="theme"
        gap="$4"
      >
        {/* English */}
        <RadioGroupItem
          value="en"
          label="English"
          onValueChange={handleValueChange}
        />

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
