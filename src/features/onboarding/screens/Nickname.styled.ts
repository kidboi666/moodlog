import { Button, H2, H3, styled, XStack, YStack } from 'tamagui';

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$6',
});

export const Title = styled(H2);

export const Description = styled(H3, {
  color: '$gray11',
});

export const ButtonContainer = styled(XStack, {
  justify: 'space-between',
});

const ButtonBase = styled(Button, {
  size: '$5',
  scaleIcon: 1.5,
});

export const PrevButton = styled(ButtonBase);

export const NextButton = styled(ButtonBase, {
  themeInverse: true,

  variants: {
    isDisabled: {
      true: {
        opacity: 0.2,
      },
    },
  },
});
