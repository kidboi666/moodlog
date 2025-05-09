import { Check } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, GetThemeValueForKey, XStack, YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared'
import {
  Layout,
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants'
import { useStepProgress } from '@/store'
import { MoodLevel } from '@/types'

interface Props {
  moodColor?: string
  moodLevel: MoodLevel
  onMoodLevelChange: (moodLevel: MoodLevel) => void
}

export function MoodLevelForm({
  moodColor,
  moodLevel,
  onMoodLevelChange,
}: Props) {
  const { t } = useTranslation()
  const {
    state: { currentStep },
  } = useStepProgress()

  if (currentStep !== 1) {
    return null
  }

  return (
    <Container>
      {Object.values(MoodLevel).map((level, i) => (
        <FormItem key={level}>
          <Button
            size='$4'
            animation='quick'
            pressStyle={PRESS_STYLE}
            animateOnly={PRESS_STYLE_KEY}
            bg={moodColor as GetThemeValueForKey<'backgroundColor'>}
            opacity={(i + 1) / Object.values(MoodLevel).length}
            onPress={() => onMoodLevelChange(level)}
          >
            <Check opacity={moodLevel === level ? 1 : 0} color='$color1' />
          </Button>
          <BaseText>{t(`moods.levels.${level}`)}</BaseText>
        </FormItem>
      ))}
    </Container>
  )
}

const Container = styled(XStack, {
  gap: '$4',
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
  justify: 'space-between',
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  height: Layout.HEIGHT.WRITE_PROGRESS_BAR_HEIGHT,
})

const FormItem = styled(YStack, {
  items: 'center',
  gap: '$2',
})
