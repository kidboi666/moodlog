import { Button, styled, Text, View, XStack, YStack } from 'tamagui';
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations';
import { CALENDAR_SCROLL_SIZE } from '@/core/constants/size';

export const CalendarContainer = styled(XStack, {
  animation: 'quick',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
  flex: 1,
  justify: 'center',
  rounded: '$4',
  items: 'center',
});

export const DateContainer = styled(View, {
  py: '$3',
  width: CALENDAR_SCROLL_SIZE,
  rounded: '$4',
  borderColor: '$gray1',

  variants: {
    isSelected: {
      true: {
        bg: '$gray5',
      },
    },
    isToday: {
      true: {
        borderWidth: 1,
      },
    },
  } as const,
});

export const DateWrapper = styled(Button, {
  unstyled: true,
  items: 'center',
});

export const DateTextWrapper = styled(YStack, {
  gap: '$2',
  items: 'center',
});

export const DayText = styled(Text, {
  fontSize: '$2',
  color: '$gray9',

  variants: {
    isSelected: {
      true: {
        color: '$gray12',
      },
    },
  } as const,
});

export const DateText = styled(Text, {
  fontSize: '$5',
  fontWeight: '800',

  variants: {
    futureDateColor: {
      ':string': color => {
        return { color };
      },
    },
  } as const,
});
