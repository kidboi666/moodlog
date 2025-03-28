import { useApp } from '@/core/store/contexts/app.context';

export const AppInitializer = () => {
  const { initAppData, isInitialApp, firstLaunchDate, isLoading } = useApp();
};
