import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        animation: 'flip',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="journal_write" />
    </Stack>
  );
}
