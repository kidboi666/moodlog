import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { OnboardingHeader } from '@/components/headers/OnboardingHeader';
import { StepProgressContextProvider } from '@/store/contexts/PageProgressContext';

export default function OnboardingLayout() {
  const theme = useTheme();

  return (
    <StepProgressContextProvider totalSteps={3}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <OnboardingHeader />,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="nickname" />
        <Stack.Screen name="signup" />
      </Stack>
    </StepProgressContextProvider>
  );
}
