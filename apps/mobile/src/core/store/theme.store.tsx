import AsyncStorage from '@react-native-async-storage/async-storage'
import { type PropsWithChildren, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { Theme as TamaguiTheme } from 'tamagui'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/core/constants/storage'
import type { ThemeStoreState } from '@/types/theme.types'

export const useAppTheme = create<ThemeStoreState>()(
  persist(
    (set, get) => ({
      currentTheme: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',

      changeTheme: theme => {
        set({ currentTheme: theme })
        const resolvedTheme = theme === 'system' ? get().systemTheme : theme
        set({ resolvedTheme })
      },

      updateSystemTheme: newSystemTheme => {
        set({ systemTheme: newSystemTheme })
        if (get().currentTheme === 'system') {
          set({ resolvedTheme: newSystemTheme })
        }
      },
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        currentTheme: state.currentTheme,
      }),
    },
  ),
)

export function ThemeProvider({ children }: PropsWithChildren) {
  const updateSystemTheme = useAppTheme(state => state.updateSystemTheme)
  const resolvedTheme = useAppTheme(state => state.resolvedTheme)
  const systemColorScheme = useColorScheme()

  useEffect(() => {
    if (systemColorScheme) {
      updateSystemTheme(systemColorScheme)
    }
  }, [systemColorScheme, updateSystemTheme])

  return <TamaguiTheme name={resolvedTheme}>{children}</TamaguiTheme>
}
