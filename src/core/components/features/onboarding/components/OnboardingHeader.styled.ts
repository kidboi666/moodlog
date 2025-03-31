import { styled, View, XStack } from 'tamagui';
import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';

export const HeaderContainer = styled(HOSHeaderContainer, {
  py: '$4',
  justify: 'center',
});

export const StepDotBox = styled(XStack, {
  gap: '$2',
});

export const Dot = styled(View, {
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
});
