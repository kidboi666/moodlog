import { useControllableState, useTheme } from 'tamagui';
import { usePathname } from 'expo-router';
import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Plus,
  Settings,
} from '@tamagui/lucide-icons';
import React, { memo, useCallback, useEffect } from 'react';
import { TAB_BAR_HEIGHT } from '@/core/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes';
import * as NavigationBar from 'expo-navigation-bar';
import * as S from './CustomTabBar.styled';
import { TabTrigger } from 'expo-router/ui';
import { ShowTabBar, Theme } from '@/types/app.types';
import { NotificationIcon } from '@/core/components/NotificationIcon';

const translates = {
  show: {
    y: 0,
  },
  hide: {
    y: 140,
  },
} as const;

interface Props {
  resolvedTheme: Omit<Theme, 'system'>;
}

export const CustomTabBar = memo(({ resolvedTheme }: Props) => {
  const theme = useTheme();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [tabBarState, setShouldHideTabBar] = useControllableState<ShowTabBar>({
    strategy: 'most-recent-wins',
    defaultProp: ShowTabBar.SHOW,
  });

  const animatedTabBar = translates[tabBarState];

  useEffect(() => {
    setShouldHideTabBar(
      HIDE_TAB_BAR_ROUTES.some(route => pathname.startsWith(route))
        ? ShowTabBar.HIDE
        : ShowTabBar.SHOW,
    );

    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        tabBarState ? theme.background.val : theme.gray4.val,
      );
    }
  }, [pathname, tabBarState, theme, insets.bottom, resolvedTheme]);

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index');
    },
    [pathname],
  );

  const isTabActive = useCallback(
    (path: string) => {
      return isActive(path);
    },
    [isActive],
  );

  return (
    <S.TabBarContainer
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      {...animatedTabBar}
    >
      <S.Container>
        <TabTrigger name="home" asChild href="/">
          <S.HomeButton isTabActive={isTabActive('/')} icon={Home} />
        </TabTrigger>
        <TabTrigger name="entries" asChild href="/entries">
          <S.CalendarButton
            isTabActive={isTabActive('/entries')}
            icon={CalendarDays}
          />
        </TabTrigger>
        <TabTrigger name="write" asChild href="/write/mood_select">
          <S.WriteButton>
            <S.WriteInnerBox>
              <Plus size="$1" />
              <NotificationIcon />
            </S.WriteInnerBox>
          </S.WriteButton>
        </TabTrigger>
        <TabTrigger name="statistics" asChild href="/statistics">
          <S.RecordButton
            isTabActive={isTabActive('/statistics')}
            icon={FileChartColumnIncreasing}
          />
        </TabTrigger>
        <TabTrigger name="settings" asChild href="/settings">
          <S.SettingsButton
            isTabActive={isTabActive('/settings')}
            icon={Settings}
          />
        </TabTrigger>
      </S.Container>
    </S.TabBarContainer>
  );
});
