import { H1, ScrollView, Separator } from 'tamagui';
import { Clock, Globe, Moon } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { NavigationSettingItem } from '@/features/settings/components/NavigationSettingItem';
import * as S from './Settings.styled';
import { useCallback } from 'react';
import { Href, useRouter } from 'expo-router';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleRouteChange = useCallback(
    (href: Href) => {
      router.push(href);
    },
    [router],
  );

  return (
    <ScrollView>
      <S.Container edges={['top']} padded>
        <H1>{t('settings.title')}</H1>
        <S.ItemContainer>
          {/* Theme Setting */}
          <NavigationSettingItem
            icon={Moon}
            label={t('settings.theme.title')}
            href="/settings/theme"
            onRouteChange={handleRouteChange}
          />
          <Separator />

          {/* Language Setting */}
          <NavigationSettingItem
            icon={Globe}
            label={t('settings.language.title')}
            onRouteChange={handleRouteChange}
            href="/settings/language"
          />
          <Separator />

          {/* TimeFormat Setting */}
          <NavigationSettingItem
            icon={Clock}
            label={t('settings.timeFormat.title')}
            onRouteChange={handleRouteChange}
            href="/settings/time_format"
          />
        </S.ItemContainer>
      </S.Container>
    </ScrollView>
  );
};
