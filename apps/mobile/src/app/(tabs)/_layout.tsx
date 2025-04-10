import { Redirect, Tabs, usePathname } from 'expo-router'
import { useEffect, useState } from 'react'

import { ContainerFog } from '@/core/components/shared/ContainerFog'
import { CustomTabBar } from '@/core/components/shared/CustomTabBar'
import { FullSpinner } from '@/core/components/shared/FullSpinner'
import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes'
import { useApp } from '@/core/store/app.store'

export default function Layout() {
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const isLoading = useApp(state => state.isLoading)
  const [initialized, setInitialized] = useState(false)
  const pathname = usePathname()
  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  )

  useEffect(() => {
    setInitialized(true)
  }, [firstLaunchDate])

  if (!initialized || isLoading) {
    return <FullSpinner size='large' />
  }

  if (!firstLaunchDate) {
    return <Redirect href='/(onboarding)/welcome' />
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
        <Tabs.Screen name='index' />
        <Tabs.Screen name='entries' />
        <Tabs.Screen name='statistics' />
        <Tabs.Screen name='settings' />
        <Tabs.Screen
          name='journal'
          options={{
            href: null,
          }}
        />
      </Tabs>
      <ContainerFog />
      {!shouldHideTabBar && <CustomTabBar />}
    </>
  )
}
