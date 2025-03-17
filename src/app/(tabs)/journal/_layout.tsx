import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function JournalLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="[journalId]" />
    </Stack>
  );
}
