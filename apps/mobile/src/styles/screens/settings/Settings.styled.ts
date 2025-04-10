import { Button, Text, YStack, styled } from 'tamagui'

import { ViewContainer as HOSContainer } from '@/core/components/shared/ViewContainer.styleable'

export const ViewContainer = styled(HOSContainer, {
  gap: '$4',
})

export const ItemContainer = styled(YStack, {
  gap: '$6',
})

export const SignInButton = styled(Button, {
  animation: 'quick',
  justify: 'flex-start',
  bg: '$color4',
  size: '$5',
  fontSize: '$6',
})

export const SignInText = styled(Text, {
  fontSize: '$5',
  flex: 1,
})
