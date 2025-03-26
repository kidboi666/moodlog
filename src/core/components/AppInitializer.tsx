import { useEffect } from 'react';
import { useApp } from '@/core/store/contexts/app.context';
import { Redirect } from 'expo-router';
import { useStatistics } from '@/core/hooks/useStatistics';

export const AppInitializer = () => {
  const { isInitialApp, initAppData } = useApp();
  const { initStats } = useStatistics();

  useEffect(() => {
    initAppData();
    initStats(new Date().getFullYear());
  }, []);

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(tabs)" />;
};
