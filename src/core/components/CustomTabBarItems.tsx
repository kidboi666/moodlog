// CustomTabBarItems.tsx
import React, { memo } from 'react';
import { TabTrigger } from 'expo-router/ui';
import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Plus,
  Settings,
} from '@tamagui/lucide-icons';
import * as S from './CustomTabBarItems.styled';

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

export const WriteTab = memo(({}: Omit<TabButtonProps, 'isTabActive'>) => {
  return (
    <TabTrigger name="write" asChild href="/write">
      <S.WriteButton>
        <S.WriteInnerBox>
          <Plus size="$1" />
        </S.WriteInnerBox>
      </S.WriteButton>
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
