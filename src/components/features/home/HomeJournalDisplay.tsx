import { ActivityIndicator } from 'react-native-paper'

import { EmptyJournal, JournalCard } from '@/components/features/journal'
import { Delay } from '@/components/shared'
import { DelayMS } from '@/constants'
import { Journal, Maybe } from '@/types'

interface Props {
  firstRender: boolean
  journals: Maybe<Journal[]>
  isLoading: boolean
}

export function HomeJournalDisplay({
  firstRender,
  journals,
  isLoading,
}: Props) {
  const delay = firstRender ? DelayMS.ANIMATION.MEDIUM * 4 : undefined
  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  return Array.isArray(journals) && journals.length > 0 ? (
    journals?.map(journal => {
      const {
        id,
        content = '',
        createdAt,
        moodName,
        imageUri = [],
        localDate,
      } = journal
      return (
        <JournalCard
          key={journal.id}
          delay={delay}
          journalId={id}
          content={content}
          moodName={moodName}
          imageUri={imageUri}
          createdAt={createdAt}
          localDate={localDate}
        />
      )
    })
  ) : (
    <Delay delay={delay}>
      <EmptyJournal source='home' />
    </Delay>
  )
}
