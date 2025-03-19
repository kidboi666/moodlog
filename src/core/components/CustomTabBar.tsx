import { useTheme } from 'tamagui';
import { Href, usePathname, useRouter } from 'expo-router';
import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Plus,
  Settings,
} from '@tamagui/lucide-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDraft } from '@/core/store/hooks/useDraft';
import { TAB_BAR_HEIGHT } from '@/core/constants/size';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes';
import * as NavigationBar from 'expo-navigation-bar';
import { FEEDBACK_DURATION } from '@/core/constants/time';
import { Nullable } from '@/core/types/utils';
import * as S from './CustomTabBar.styled';
import { TabTrigger } from 'expo-router/ui';

const AnimatedStack = Animated.createAnimatedComponent(S.TabBarContainer);

const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

export const CustomTabBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { draft } = useDraft();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState<Nullable<string>>(null);
  const [lastTapTimestamp, setLastTapTimestamp] = useState(0);

  const shouldHideTabBar = useMemo(
    () => HIDE_TAB_BAR_ROUTES.some(route => pathname.startsWith(route)),
    [pathname],
  );

  useEffect(() => {
    translateY.value = withTiming(
      shouldHideTabBar ? TAB_BAR_HEIGHT + insets.bottom : 0,
      ANIMATION_CONFIG,
    );

    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        shouldHideTabBar ? theme.background.val : theme.gray4.val,
      );
    }
  }, [pathname, shouldHideTabBar, theme, insets.bottom, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index');
    },
    [pathname],
  );

  const isTabActive = useCallback(
    (path: string) => {
      return isActive(path) || activeTab === path;
    },
    [isActive, activeTab],
  );

  const navigateTo = useCallback(
    (path: string) => {
      if (isActive(path)) return;

      const now = Date.now();
      if (now - lastTapTimestamp < FEEDBACK_DURATION) return;
      setLastTapTimestamp(now);

      setActiveTab(path);

      router.push(path as Href);
      setTimeout(() => {
        setActiveTab(null);
      }, FEEDBACK_DURATION);
    },
    [router, pathname, isActive, lastTapTimestamp],
  );

  const showDraftNotification = useMemo(
    () => Boolean(draft.content || draft.emotion?.type),
    [draft.content, draft.emotion?.type],
  );

  return (
    <AnimatedStack
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      style={animatedStyle}
    >
      <S.Container>
        <TabTrigger name="home" asChild onPress={() => navigateTo('/')}>
          <S.HomeButton isTabActive={isTabActive('/')} icon={Home} />
        </TabTrigger>
        <TabTrigger
          name="entries"
          asChild
          onPress={() => navigateTo('/entries')}
        >
          <S.CalendarButton
            isTabActive={isTabActive('/entries')}
            icon={CalendarDays}
          />
        </TabTrigger>
        <TabTrigger
          name="write"
          asChild
          onPress={() => navigateTo('/write/mood_select')}
        >
          <S.WriteButton>
            <S.WriteInnerBox>
              <Plus size="$1" />
              <S.Circle showDraftNotification={showDraftNotification} />
            </S.WriteInnerBox>
          </S.WriteButton>
        </TabTrigger>
        <TabTrigger
          name="statistics"
          asChild
          onPress={() => navigateTo('/statistics')}
        >
          <S.RecordButton
            isTabActive={isTabActive('/statistics')}
            icon={FileChartColumnIncreasing}
          />
        </TabTrigger>
        <TabTrigger
          name="settings"
          asChild
          onPress={() => navigateTo('/settings')}
        >
          <S.SettingsButton
            isTabActive={isTabActive('/settings')}
            icon={Settings}
          />
        </TabTrigger>
      </S.Container>
    </AnimatedStack>
  );
};
