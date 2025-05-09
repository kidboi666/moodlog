import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Keyboard } from 'react-native'

import { DelayMS } from '@/constants'
import { useUI } from '@/store'
import { CommonUtils } from '@/utils'

type MoodState = {
  name: string
  color: string
}

export const useAddMood = (
  mood: MoodState,
  onIsSuccessChange: (bool: boolean) => void,
) => {
  const router = useRouter()
  const setNavigating = useUI(state => state.setNavigating)

  const handleSuccess = useCallback(async () => {
    onIsSuccessChange(true)
    Keyboard.dismiss()

    const animationTimer = setTimeout(() => {
      onIsSuccessChange(false)
    }, DelayMS.ANIMATION.LONG[2])

    await CommonUtils.delay(DelayMS.WAIT.WRITE_MOOD, () => {
      router.replace({
        pathname: '/(tabs)',
        params: {
          moodName: mood.name,
          moodColor: mood.color,
        },
      })
    })

    return () => clearTimeout(animationTimer)
  }, [onIsSuccessChange, mood.name, mood.color, router])

  const handleSubmit = useCallback(async () => {
    const newMood = {
      id: Crypto.randomUUID(),
      name: mood.name,
      color: mood.color,
      createdAt: new Date().toISOString(),
    }
    await moodService.addMood(newMood)

    handleSuccess()
  }, [mood.name, mood.color, router, setNavigating])

  return {
    onSubmit: handleSubmit,
  }
}
