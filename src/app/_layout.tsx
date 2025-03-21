import '../../tamagui-web.css';
import { RootProvider } from '@/core/providers/RootProvider';
import { useFonts } from 'expo-font';
import { useEffect, useMemo } from 'react';
import { StatusBar } from '@/core/components/StatusBar';
import { Platform, Text, View } from 'react-native';
import { useTheme } from 'tamagui';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CurrentToast } from '@/core/components/CurrentToast';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useUser } from '@/core/store/hooks/useUser';
import { ErrorBoundaryProps, Stack } from 'expo-router';
import '../lib/i18n';
import * as NavigationBar from 'expo-navigation-bar';
import { useAppTheme } from '@/core/store/contexts/theme.context';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const FONTS = {
  'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.ttf'),
  'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.ttf'),
  'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.ttf'),
  'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.ttf'),
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts(FONTS);

  useEffect(() => {
    async function hideSplashScreen() {
      try {
        if (fontLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (err) {
        console.warn('Error hiding splash screen:', err);
      }
    }

    hideSplashScreen();
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }
  return (
    <RootProvider>
      <RootLayoutNav />
    </RootProvider>
  );
}

function RootLayoutNav() {
  const { resolvedTheme } = useAppTheme();
  const theme = useTheme();
  const { isLoading } = useUser();

  const backgroundStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: theme.background.val,
    }),
    [theme.background.val, resolvedTheme],
  );

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      contentStyle: backgroundStyle,
      headerStyle: backgroundStyle,
    }),
    [backgroundStyle],
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      );
    }
  }, [resolvedTheme]);

  if (isLoading) return null;

  return (
    <GestureHandlerRootView style={backgroundStyle}>
      <ThemeProvider
        value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StatusBar />
        <BottomSheetModalProvider>
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <CurrentToast />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
