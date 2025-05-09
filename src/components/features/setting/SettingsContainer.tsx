import { PropsWithChildren } from 'react'
import { View, styled } from 'tamagui'

import { BaseText } from '@/components/shared'

interface Props {
  title?: string
}

export function SettingsContainer({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <SettingContent>{children}</SettingContent>
    </Container>
  )
}

const Container = styled(View, {
  gap: '$3',
})

const Title = styled(BaseText, {
  ml: '$5',
})

const SettingContent = styled(View, {
  rounded: '$4',
  bg: '$color4',
})
