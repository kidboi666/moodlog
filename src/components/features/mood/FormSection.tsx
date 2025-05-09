import { XStack, YStack, styled } from 'tamagui'

import { Layout } from '@/constants'
import { ColorPicker } from '../write/ColorPicker'
import { MoodNameForm } from './MoodNameForm'

interface Props {
  moodName: string
  onMoodNameChange: (name: string) => void
  moodColor: string
  onMoodColorChange: (color: string) => void
  position: Record<string, number>
  width: number
  currentStep: number
}

export function FormSection({
  moodName,
  onMoodNameChange,
  moodColor,
  onMoodColorChange,
  position,
  width,
  currentStep,
}: Props) {
  return (
    <Container>
      <FormContainer {...position}>
        <ColorPicker
          show={currentStep === 0}
          moodColor={moodColor}
          onMoodColorChange={onMoodColorChange}
          width={width - Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2}
        />
        <MoodNameForm
          moodName={moodName}
          onMoodNameChange={onMoodNameChange}
          width={width - Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2}
        />
      </FormContainer>
    </Container>
  )
}

const Container = styled(YStack, {
  gap: '$4',
  flex: 1,
})

const FormContainer = styled(XStack, {
  gap: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2,
  animation: 'quick',
  flex: 1,
})
