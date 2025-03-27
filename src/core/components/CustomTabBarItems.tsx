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
import { Href } from 'expo-router';

interface TabButtonProps {
  isTabActive: boolean;
  onRouteChange: (href: Href) => void;
}

export const HomeTab = memo(
  ({ isTabActive, onRouteChange }: TabButtonProps) => {
    return (
      <TabTrigger name="home" asChild onPress={() => onRouteChange('/')}>
        <S.HomeButton isTabActive={isTabActive} icon={Home} />
      </TabTrigger>
    );
  },
);

export const CalendarTab = memo(
  ({ isTabActive, onRouteChange }: TabButtonProps) => {
    return (
      <TabTrigger
        name="entries"
        asChild
        onPress={() => onRouteChange('/entries')}
      >
        <S.CalendarButton isTabActive={isTabActive} icon={CalendarDays} />
      </TabTrigger>
    );
  },
);

export const WriteTab = memo(
  ({ onRouteChange }: Omit<TabButtonProps, 'isTabActive'>) => {
    return (
      <TabTrigger name="write" asChild onPress={() => onRouteChange('/write')}>
        <S.WriteButton>
          <S.WriteInnerBox>
            <Plus size="$1" />
          </S.WriteInnerBox>
        </S.WriteButton>
      </TabTrigger>
    );
  },
);

export const StatisticsTab = memo(
  ({ isTabActive, onRouteChange }: TabButtonProps) => {
    return (
      <TabTrigger
        name="statistics"
        asChild
        onPress={() => onRouteChange('/statistics')}
      >
        <S.RecordButton
          isTabActive={isTabActive}
          icon={FileChartColumnIncreasing}
        />
      </TabTrigger>
    );
  },
);

export const SettingsTab = memo(
  ({ isTabActive, onRouteChange }: TabButtonProps) => {
    return (
      <TabTrigger
        name="settings"
        asChild
        onPress={() => onRouteChange('/settings')}
      >
        <S.SettingsButton isTabActive={isTabActive} icon={Settings} />
      </TabTrigger>
    );
  },
);
