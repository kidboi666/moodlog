import { ContainerFog } from '@/core/components/ContainerFog';
import React, { useEffect } from 'react';
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
import { useApp } from '@/core/store/contexts/app.context';
import { Spinner, View } from 'tamagui';
import { Redirect } from 'expo-router';

const renderScreen = (desc: TabsDescriptor, opt: TabsSlotRenderOptions) => {
  const Content = defaultTabsSlotRender(desc, opt);

  if (!Content || !opt.isFocused) return null;

  return <>{Content}</>;
};

export default function Layout() {
  const { initAppData, isInitialApp, firstLaunchDate, isLoading } = useApp();

  useEffect(() => {
    initAppData();
  }, [initAppData]);

  if (isLoading || !isInitialApp) {
    return (
      <View flex={1} justify="center" items="center">
        <Spinner />
      </View>
    );
  }
  if (!firstLaunchDate) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Tabs>
      <TabSlot renderFn={renderScreen} />
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
    </Tabs>
  );
}
