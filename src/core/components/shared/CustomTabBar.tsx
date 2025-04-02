import { useTheme } from 'tamagui';
import { Href, usePathname, useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { TAB_BAR_HEIGHT } from '@/core/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes';
import * as NavigationBar from 'expo-navigation-bar';
import * as S from './CustomTabBar.styled';
import {
  EntriesTab,
  HomeTab,
  SettingsTab,
  StatisticsTab,
} from './CustomTabBarItems';
import Animated from 'react-native-reanimated';
import { Position } from '@/types/app.types';
import { useAxisAnimationWithState } from '@/core/hooks/useAxisAnimationWithState';
import { WriteButtonWithEvent } from '@/core/components/shared/WriteButtonWithEvent';

const AnimatedTabBar = Animated.createAnimatedComponent(S.TabBarContainer);

export const CustomTabBar = memo(() => {
  const theme = useTheme();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  );

  const {
    state: position,
    animatedStyle,
    changeStateByCondition,
  } = useAxisAnimationWithState('y', {
    defaultState: Position.TOP,
    nextState: Position.BOTTOM,
    startValue: 0,
    endValue: 140,
    duration: 1000,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        position ? theme.background.val : theme.color5.val,
      );
    }
  }, [position, theme, pathname]);

  useEffect(() => {
    changeStateByCondition(shouldHideTabBar);
  }, [pathname]);

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

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path as Href);
    },
    [router],
  );

  return (
    <AnimatedTabBar
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      style={animatedStyle}
    >
      <S.Container>
        <HomeTab
          isTabActive={isHomeActive}
          onPress={() => handleNavigate('/')}
        />
        <EntriesTab
          isTabActive={isCalendarActive}
          onPress={() => handleNavigate('/entries')}
        />
        <WriteButtonWithEvent />
        <StatisticsTab
          isTabActive={isStatisticsActive}
          onPress={() => handleNavigate('/statistics')}
        />
        <SettingsTab
          isTabActive={isSettingsActive}
          onPress={() => handleNavigate('/settings')}
        />
      </S.Container>
    </AnimatedTabBar>
  );
});
