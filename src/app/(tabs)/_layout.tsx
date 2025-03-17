import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';
import { ContainerFog } from '@/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/components/CustomTabBar';
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
import { useApp } from '@/store/hooks/useApp';

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
        <TabTrigger name="record" href="/record" />
        <TabTrigger name="settings" href="/settings" />
        <TabTrigger name="journal" href="/journal/[journalId]" />
      </TabList>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </Tabs>
  );
}
