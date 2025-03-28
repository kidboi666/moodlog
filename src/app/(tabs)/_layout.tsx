import { ContainerFog } from '@/core/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/core/components/CustomTabBar';
import {
  defaultTabsSlotRender,
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
} from 'expo-router/ui';
import { TabsDescriptor } from 'expo-router/build/ui/TabContext';
import { TabsSlotRenderOptions } from 'expo-router/build/ui/TabSlot';

const renderScreen = (desc: TabsDescriptor, opt: TabsSlotRenderOptions) => {
  const Content = defaultTabsSlotRender(desc, opt);

  if (!Content || !opt.isFocused) return null;

  return <>{Content}</>;
};

export default function Layout() {
  return (
    <Tabs>
      <TabSlot renderFn={renderScreen} />
      <ContainerFog />
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="entries" href="/entries" />
        <TabTrigger name="write" href="/write" />
        <TabTrigger name="statistics" href="/statistics" />
        <TabTrigger name="settings" href="/settings" />
        <TabTrigger name="journal" href="/journal/[id]" />
      </TabList>
      <CustomTabBar />
    </Tabs>
  );
}
