import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function SettingsLayout() {
  const theme = useTheme();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background.val },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="language" />
    </Stack>
  );
}
