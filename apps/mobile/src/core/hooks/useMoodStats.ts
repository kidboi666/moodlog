import { useMemo } from 'react'

import { Statistics } from '@/core/services/statistics.service'
import { useJournal } from '@/core/store/journal.store'
import type { ISOMonthString } from '@/types/date.types'
import { TimeRange } from '@/types/statistic.types'

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) => {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useJournal(state => state.isLoading)

  const yearlyStats = useMemo(
    () => Statistics.getYearlyStats(journals, indexes, timeRange, selectedYear),
    [journals, indexes, timeRange, selectedYear],
  )

  const monthlyStats = useMemo(
    () =>
      Statistics.getMonthlyStats(journals, indexes, timeRange, selectedMonth),
    [journals, indexes, timeRange, selectedMonth],
  )

  const initialStats = (timeRange: TimeRange) => {
    switch (timeRange) {
      case TimeRange.YEARLY:
        return yearlyStats
      case TimeRange.MONTHLY:
        return monthlyStats
      default:
        return yearlyStats
    }
  }

  return {
    stats: initialStats(timeRange),
    isLoading,
  }
}
