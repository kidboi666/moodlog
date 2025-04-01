import React, { memo } from 'react';
import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Settings,
} from '@tamagui/lucide-icons';
import * as S from './CustomTabBar.styled';

interface TabButtonProps {
  isTabActive: boolean;
  onPress: () => void;
}

export const HomeTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <S.HomeButton isTabActive={isTabActive} icon={Home} onPress={onPress} />
  );
});

export const EntriesTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <S.CalendarButton
      isTabActive={isTabActive}
      icon={CalendarDays}
      onPress={onPress}
    />
  );
});

export const StatisticsTab = memo(
  ({ isTabActive, onPress }: TabButtonProps) => {
    return (
      <S.RecordButton
        isTabActive={isTabActive}
        icon={FileChartColumnIncreasing}
        onPress={onPress}
      />
    );
  },
);

export const SettingsTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <S.SettingsButton
      isTabActive={isTabActive}
      icon={Settings}
      onPress={onPress}
    />
  );
});
