import { useEffect } from 'react';
import { useApp } from '@/core/store/contexts/app.context';
import { Redirect } from 'expo-router';
import { Spinner } from 'tamagui';

export const AppInitializer = () => {
  const { isInitialApp, initAppData, isLoading } = useApp();

  useEffect(() => {
    initAppData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(tabs)" />;
};
