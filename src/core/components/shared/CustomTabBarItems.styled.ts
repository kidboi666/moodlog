import { styled, View } from 'tamagui';
import { PressableButton } from '@/core/components/shared/ui/PressableButton.styled';

const TabButton = styled(PressableButton, {
  color: '$gray9',
  bg: '$gray4',
  elevate: false,

  variants: {
    isTabActive: {
      true: {
        color: '$gray11',
        bg: '$backgroundStrong',
      },
    },
  } as const,
});

export const HomeButton = styled(TabButton, {
  borderTopLeftRadius: '$9',
});

export const CalendarButton = styled(TabButton);

export const WriteButton = styled(TabButton, {
  themeInverse: true,
});

export const WriteInnerBox = styled(View);

export const RecordButton = styled(TabButton);

export const SettingsButton = styled(TabButton, {
  borderTopRightRadius: '$9',
});
