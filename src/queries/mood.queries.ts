import { queryOptions, useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'
import { moods } from '../../db/sqlite/schema'

import { useExceptionHandle } from '@/hooks'
import {
  addMood,
  deleteMood,
  getMoodById,
  getMoodByName,
  getMoods,
  updateMood,
} from '@/services'
import { MoodDraft, Moods } from '@/types'

export const MoodQueries = {
  /**
   * 현재 감정 전부 가져오기
   */
  getMoods: () => {
    return queryOptions({
      queryKey: ['moods'],
      queryFn: () => getMoods(),
      select: data => {
        return data.reduce((acc, mood) => {
          acc[mood.id] = mood
          return acc
        }, {} as Moods)
      },
    })
  },

  /**
   * id로 감정 가져오기
   */
  getMoodById: (id: number) => {
    return queryOptions({
      queryKey: ['moods', id],
      queryFn: () => getMoodById(id),
    })
  },

  /**
   * name 으로 감정 가져오기
   */
  getMoodByName: (name: string) => {
    return queryOptions({
      queryKey: ['moods', name],
      queryFn: () => getMoodByName(name),
    })
  },
}

/**
 * Insert 새 감정 추가하기
 */
export function useAddMood() {
  const router = useRouter()
  const { onError } = useExceptionHandle()
  return useMutation({
    mutationFn: (moodDraft: MoodDraft) => addMood(moodDraft),
    onError: error => onError(error.message, error),
    onSuccess: () => {
      Keyboard.dismiss()
      router.replace('/(tabs)')
    },
  })
}

/**
 * Update 감정 수정하기
 */
export function useUpdateMood() {
  return useMutation({
    mutationFn: (args: {
      id: number
      moodDraft: Partial<Omit<typeof moods.$inferInsert, 'id' | 'createdAt'>>
    }) => updateMood(args.id, args.moodDraft),
    onError: (error, variables) => {
      console.error('error', error)
    },
    onSuccess: () => {
      Keyboard.dismiss()
    },
  })
}

export function useDeleteMood() {
  return useMutation({
    mutationFn: (id: number) => deleteMood(id),
  })
}
