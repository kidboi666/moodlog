import { Trash } from '@tamagui/lucide-icons'
import { AnimatePresence, XStack, styled } from 'tamagui'

import { PressableButton } from '@/components/shared'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'
import { Position } from '@/types'

interface ActionButtonProps {
  cardPosition: Position
  onPress: () => void
}

export function ActionButton({ cardPosition, onPress }: ActionButtonProps) {
  return (
    <AnimatePresence>
      {cardPosition === Position.LEFT && (
        <ActionBox>
          <PressableButton
            circular={true}
            chromeless={true}
            scaleIcon={1.5}
            bg='$red10'
            color='white'
            shadowColor='#000'
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.2}
            shadowRadius={1.5}
            elevation={2}
            icon={Trash}
            onPress={onPress}
          />
        </ActionBox>
      )}
    </AnimatePresence>
  )
}

const ActionBox = styled(XStack, {
  r: 0,
  position: 'absolute',
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
  height: '100%',
  items: 'center',
  justify: 'center',
  px: 16,
  z: -1,
})
