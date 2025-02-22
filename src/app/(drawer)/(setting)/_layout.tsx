import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { SettingHeader } from '@/components/headers/SettingHeader';

export default function SettingLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => <SettingHeader navigation={navigation} />,
        contentStyle: { backgroundColor: theme.background.val },
      }}
    >
      <Stack.Screen name="setting_main" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="language" />
    </Stack>
  );
}
