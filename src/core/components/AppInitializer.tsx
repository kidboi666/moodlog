import { useEffect } from 'react';
import { useApp } from '@/core/store/contexts/app.context';
import { Spinner } from 'tamagui';
import { Redirect } from 'expo-router';
import * as S from './AppInitializer.styled';

export const AppInitializer = () => {
  const { isInitialApp, isLoading, initAppData } = useApp();

  useEffect(() => {
    initAppData();
  }, []);

  if (isLoading) {
    return (
      <S.SpinnerContainer>
        <Spinner fullscreen />
      </S.SpinnerContainer>
    );
  }

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
};
