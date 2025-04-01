// CustomTabBarItems.tsx
import React, { memo } from 'react';
import { TabTrigger } from 'expo-router/ui';
import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Settings,
} from '@tamagui/lucide-icons';
import * as S from './CustomTabBar.styled';

interface TabButtonProps {
  isTabActive: boolean;
}
export const HomeTab = memo(({ isTabActive }: TabButtonProps) => {
  return (
    <TabTrigger name="home" asChild href="/">
      <S.HomeButton isTabActive={isTabActive} icon={Home} />
    </TabTrigger>
  );
});

export const EntriesTab = memo(({ isTabActive }: TabButtonProps) => {
  return (
    <TabTrigger name="entries" asChild href="/entries">
      <S.CalendarButton isTabActive={isTabActive} icon={CalendarDays} />
    </TabTrigger>
  );
});

export const StatisticsTab = memo(({ isTabActive }: TabButtonProps) => {
  return (
    <TabTrigger name="statistics" asChild href="/statistics">
      <S.RecordButton
        isTabActive={isTabActive}
        icon={FileChartColumnIncreasing}
      />
    </TabTrigger>
  );
});

export const SettingsTab = memo(({ isTabActive }: TabButtonProps) => {
  return (
    <TabTrigger name="settings" asChild href="/settings">
      <S.SettingsButton isTabActive={isTabActive} icon={Settings} />
    </TabTrigger>
  );
});
