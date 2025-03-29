import { ContainerFog } from '@/core/components/ContainerFog';
import React, { useEffect } from 'react';
import { CustomTabBar } from '@/core/components/CustomTabBar';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { useApp } from '@/core/store/contexts/app.context';
import { Redirect } from 'expo-router';
import { FullSpinner } from '@/core/components/FullSpinner';

export default function Layout() {
  const { initAppData, isInitialApp, firstLaunchDate, isLoading } = useApp();

  useEffect(() => {
    initAppData();
  }, [initAppData]);

  if (isLoading || !isInitialApp) {
    return <FullSpinner size="large" />;
  }
  if (!firstLaunchDate) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

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
    </Tabs>
  );
}
