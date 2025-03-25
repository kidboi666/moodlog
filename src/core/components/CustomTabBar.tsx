import { useControllableState, useTheme } from 'tamagui';
import { usePathname } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { TAB_BAR_HEIGHT } from '@/core/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes';
import * as NavigationBar from 'expo-navigation-bar';
import * as S from './CustomTabBar.styled';
import { ShowTabBar } from '@/types/app.types';
import {
  CalendarTab,
  HomeTab,
  SettingsTab,
  StatisticsTab,
  WriteTab,
} from './TabItems';
import { TAB_BAR_TRANSLATE } from '@/core/styles/animations';

export const CustomTabBar = memo(() => {
  const theme = useTheme();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [tabBarState, setShouldHideTabBar] = useControllableState<ShowTabBar>({
    strategy: 'most-recent-wins',
    defaultProp: ShowTabBar.SHOW,
  });

  const animatedTabBar = useMemo(
    () => TAB_BAR_TRANSLATE[tabBarState],
    [tabBarState],
  );

  useEffect(() => {
    setShouldHideTabBar(
      HIDE_TAB_BAR_ROUTES.some(route => pathname.startsWith(route))
        ? ShowTabBar.HIDE
        : ShowTabBar.SHOW,
    );
  }, [pathname, setShouldHideTabBar]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        tabBarState ? theme.background.val : theme.gray4.val,
      );
    }
  }, [tabBarState, theme]);

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index');
    },
    [pathname],
  );

  const isHomeActive = useMemo(() => isActive('/'), [isActive]);
  const isCalendarActive = useMemo(() => isActive('/entries'), [isActive]);
  const isStatisticsActive = useMemo(() => isActive('/statistics'), [isActive]);
  const isSettingsActive = useMemo(() => isActive('/settings'), [isActive]);

  return (
    <S.TabBarContainer
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      {...animatedTabBar}
    >
      <S.Container>
        <HomeTab isTabActive={isHomeActive} />
        <CalendarTab isTabActive={isCalendarActive} />
        <WriteTab />
        <StatisticsTab isTabActive={isStatisticsActive} />
        <SettingsTab isTabActive={isSettingsActive} />
      </S.Container>
    </S.TabBarContainer>
  );
});
