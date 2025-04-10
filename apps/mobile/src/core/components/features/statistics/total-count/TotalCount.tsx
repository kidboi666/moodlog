import Animated from 'react-native-reanimated'

import { CollapsedContent } from '@/core/components/features/statistics/total-count/CollapsedContent'
import { ExpandedContent } from '@/core/components/features/statistics/total-count/ExpandedContent'
import { useExpandAnimation } from '@/core/hooks/useExpandAnimation'
import { useJournalStats } from '@/core/hooks/useJournalStats'
import { useApp } from '@/core/store/app.store'
import type { ISOMonthString } from '@/types/date.types'
import { ExpansionState, TimeRange } from '@/types/statistic.types'
import { getDaysSinceSignup } from '@/utils/date'
import * as S from './TotalCount.styled'

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer)

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export const TotalCount = ({ selectedYear, selectedMonth }: Props) => {
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const daysSinceSignup = getDaysSinceSignup(firstLaunchDate!)
  const { stats } = useJournalStats(
    TimeRange.YEARLY,
    selectedYear,
    selectedMonth,
  )
  const { animatedStyle, expansionState, onPress } = useExpandAnimation()

  const { expressiveMonth, totalCount, frequency, activeDay } = stats || {}

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
        <ExpandedContent
          expressiveMonth={expressiveMonth}
          totalCount={totalCount}
          daysSinceSignup={daysSinceSignup}
          frequency={frequency}
          activeDay={activeDay}
        />
      ) : (
        <CollapsedContent totalCount={totalCount} />
      )}
    </AnimatedCardContainer>
  )
}
