import { useTheme } from 'tamagui';
import { Stack } from 'expo-router';

export default function Layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
