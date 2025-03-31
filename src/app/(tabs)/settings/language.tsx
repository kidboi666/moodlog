import { useApp } from '@/core/store/contexts/app.context';
import { useCallback } from 'react';
import { Languages } from '@/types/app.types';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { SettingHeader } from '@/core/components/features/settings/components/SettingHeader';
import { RadioGroup } from 'tamagui';
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem';

export default function Screen() {
  const { language, onSettingChange } = useApp();

  const handleValueChange = useCallback(
    (language: string) => {
      onSettingChange('language', language as Languages);
    },
    [onSettingChange],
  );

  return (
    <ViewContainer Header={<SettingHeader />}>
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
    </ViewContainer>
  );
}
