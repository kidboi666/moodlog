import { useEffect } from 'react';
import { useApp } from '@/core/store/contexts/app.context';
import { Redirect } from 'expo-router';

export const AppInitializer = () => {
  const { isInitialApp, initAppData } = useApp();

  useEffect(() => {
    initAppData();
  }, []);

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
};
