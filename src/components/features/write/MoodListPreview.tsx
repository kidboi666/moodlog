import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'

import { MoodPreviewItem } from '@/components/features/mood'
import { IconButton } from '@/components/shared'
import { Layout } from '@/constants'
import { useDeleteMood } from '@/queries'
import { Moods } from '@/types'

interface Props {
  moods: Moods
  page: number
  selectedMoodId?: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  showDeleteButton: boolean
  scrollEnabled: boolean
  onMoodIdChange: (moodId: number) => void
}

export function MoodListPreview({
  moods,
  showDeleteButton,
  page,
  selectedMoodId,
  setPage,
  totalPage,
  scrollEnabled,
  onMoodIdChange,
}: Props) {
  const { width } = useWindowDimensions()
  const { mutate: deleteMood } = useDeleteMood()
  const flatListRef = useRef<FlatList<any>>(null)

  useEffect(() => {
    if (flatListRef.current && Object.values(moods).length > 0) {
      const maxIndex = Object.values(moods).length - 1
      const safeIndex = Math.min(Math.max(page, 0), maxIndex)
      flatListRef.current.scrollToIndex({
        index: safeIndex,
        animated: true,
      })
    }
  }, [page, moods])

  return (
    <View style={styles.container}>
      {showDeleteButton && (
        <IconButton
          icon='delete'
          onPress={() => deleteMood(selectedMoodId ?? 0)}
        />
      )}
      <FlatList
        ref={flatListRef}
        scrollEnabled={scrollEnabled}
        data={Object.values(moods)}
        renderItem={({ item }) => (
          <MoodPreviewItem name={item.name} color={item.color} />
        )}
        onScrollToIndexFailed={info => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            })
          }, 100)
        }}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        snapToInterval={width}
        keyExtractor={item => item.id}
        onViewableItemsChanged={({ viewableItems }) => {
          onMoodIdChange(viewableItems[0]?.item?.id || '')
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const page = Math.round(nativeEvent.contentOffset.x / width)
          setPage([page, totalPage])
        }}
        pagingEnabled
        decelerationRate='fast'
        horizontal
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    zIndex: 100,
  },
})
