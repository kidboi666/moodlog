import { BottomModal } from '@/core/components/modals/BottomModal';
import { DevContainer } from '@/core/components/DevContainer';
import { ContainerFog } from '@/core/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/core/components/CustomTabBar';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { useAppTheme } from '@/core/store/contexts/theme.context';

export default function TabsLayout() {
  const { resolvedTheme } = useAppTheme();

  return (
    <Tabs>
      <TabSlot />
      <ContainerFog />
      <CustomTabBar resolvedTheme={resolvedTheme} />
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="home" href="/(tabs)" />
        <TabTrigger name="entries" href="/(tabs)/entries" />
        <TabTrigger name="write" href="/(tabs)/write/mood_select" />
        <TabTrigger name="statistics" href="/(tabs)/statistics" />
        <TabTrigger name="settings" href="/(tabs)/settings" />
        <TabTrigger name="journal" href="/(tabs)/journal/[journalId]" />
      </TabList>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </Tabs>
  );
}
