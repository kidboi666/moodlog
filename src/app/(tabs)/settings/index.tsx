import { useTranslation } from 'react-i18next';
import { Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import * as S from '@/styles/screens/settings/Settings.styled';
import { H1 } from 'tamagui';
import { NavigationSettingItem } from '@/core/components/features/settings/components/NavigationSettingItem';
import { Clock, Globe, Moon } from '@tamagui/lucide-icons';

export default function Screen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route);
    },
    [router],
  );

  return (
    <S.ScrollViewContainer edges={['top']} padded>
      <H1>{t('settings.title')}</H1>
      <S.ItemContainer>
        {/* Theme Setting */}
        <NavigationSettingItem
          icon={Moon}
          label={t('settings.theme.title')}
          href="/settings/theme"
          onRouteChange={handleRouteChange}
        />

        {/* Language Setting */}
        <NavigationSettingItem
          icon={Globe}
          label={t('settings.language.title')}
          onRouteChange={handleRouteChange}
          href="/settings/language"
        />

        {/* TimeFormat Setting */}
        <NavigationSettingItem
          icon={Clock}
          label={t('settings.timeFormat.title')}
          onRouteChange={handleRouteChange}
          href="/settings/time_format"
        />
      </S.ItemContainer>
    </S.ScrollViewContainer>
  );
}
