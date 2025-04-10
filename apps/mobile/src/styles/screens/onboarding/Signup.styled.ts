import { Button, H3, Paragraph, View, XStack, YStack, styled } from 'tamagui'

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$4',
})

export const BenefitsContainer = styled(YStack, {
  bg: '$gray12',
  p: '$5',
  gap: '$4',
  rounded: '$8',
})

export const BenefitTitle = styled(H3, {
  color: '$gray1',
})

export const BenefitsBox = styled(YStack, {
  gap: '$2',
})

export const BenefitText = styled(Paragraph, {
  color: '$gray2',
})

export const RestBox = styled(View, {
  flex: 1,
})

export const ButtonContainer = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
})

const ButtonBase = styled(Button, {
  size: '$5',
  scaleIcon: 1.5,
  animation: 'quick',
})

export const PrevButton = styled(ButtonBase)

export const ConfirmButton = styled(ButtonBase, {
  themeInverse: true,
  opacity: 1,

  variants: {
    disabled: {
      true: {
        opacity: 0.2,
      },
    },
  },
})

export const SkipButton = styled(ButtonBase, {
  chromeless: true,
})
