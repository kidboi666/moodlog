import { BottomModal } from '@/core/components/modals/BottomModal';
import { DevContainer } from '@/core/components/DevContainer';
import { ContainerFog } from '@/core/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/core/components/CustomTabBar';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <ContainerFog />
      <CustomTabBar />
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="entries" href="/entries" />
        <TabTrigger name="write" href="/write" />
        <TabTrigger name="statistics" href="/statistics" />
        <TabTrigger name="settings" href="/settings" />
        <TabTrigger name="journal" href="/journal/[id]" />
      </TabList>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </Tabs>
  );
}
