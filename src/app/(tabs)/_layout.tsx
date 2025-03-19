import { BottomModal } from '@/core/components/modals/BottomModal';
import { DevContainer } from '@/core/components/layouts/containers/DevContainer';
import { ContainerFog } from '@/core/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/core/components/CustomTabBar';
import {
  defaultTabsSlotRender,
  TabList,
  Tabs,
  TabsDescriptor,
  TabSlot,
  TabsSlotRenderOptions,
  TabTrigger,
} from 'expo-router/ui';
import { Redirect } from 'expo-router';
import { useApp } from '@/core/store/hooks/useApp';

const renderFn = (desc: TabsDescriptor, opt: TabsSlotRenderOptions) => {
  const Content = defaultTabsSlotRender(desc, opt);

  if (!Content || !opt.isFocused) return null;

  return <>{Content}</>;
};

export default function TabsLayout() {
  const { isInitialApp } = useApp();

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)/welcome" />;
  }
  return (
    <Tabs>
      <TabSlot renderFn={renderFn} />
      <ContainerFog />
      <CustomTabBar />
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="entries" href="/entries" />
        <TabTrigger name="write" href="/write/mood_select" />
        <TabTrigger name="statistics" href="/statistics" />
        <TabTrigger name="settings" href="/settings" />
        <TabTrigger name="journal" href="/journal/[journalId]" />
      </TabList>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </Tabs>
  );
}
