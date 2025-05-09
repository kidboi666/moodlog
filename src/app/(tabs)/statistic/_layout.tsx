import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function StatisticsLayout() {
  const theme = useTheme()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}
