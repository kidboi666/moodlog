import { View, XStack, styled } from 'tamagui'

import { useStepProgress } from '@/store'

export function StepDot() {
  const {
    state: { currentStep, totalSteps },
  } = useStepProgress()

  return (
    <Container>
      <SpacingBox>
        {Array.from({ length: totalSteps }, (_, i) => (
          <Dot key={i} isCurrentStep={i === currentStep} />
        ))}
      </SpacingBox>
    </Container>
  )
}

const Container = styled(View, {
  items: 'center',
  flex: 1,
  my: '$2',
})

const SpacingBox = styled(XStack, {
  gap: '$2',
})

const Dot = styled(View, {
  width: '$1',
  height: '$0.75',
  rounded: '$4',
  bg: '$gray7',

  variants: {
    isCurrentStep: {
      true: {
        bg: '$gray12',
      },
    },
  } as const,
})
