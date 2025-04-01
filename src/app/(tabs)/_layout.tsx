import { ContainerFog } from '@/core/components/shared/ContainerFog';
import React, { useEffect } from 'react';
import { CustomTabBar } from '@/core/components/shared/CustomTabBar';
import { Redirect, Tabs } from 'expo-router';
import { useApp } from '@/core/store/contexts/app.context';
import { FullSpinner } from '@/core/components/shared/FullSpinner';

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
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
          animation: 'fade',
          sceneStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="entries" />
        <Tabs.Screen name="write" />
        <Tabs.Screen name="statistics" />
        <Tabs.Screen name="settings" />
        <Tabs.Screen
          name="journal/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <ContainerFog />
      <CustomTabBar />
    </>
  );
}
