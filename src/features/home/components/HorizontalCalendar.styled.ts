import { Button, styled, Text, XStack, YStack } from 'tamagui';
import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/core/constants/styles';
import { CALENDAR_SCROLL_SIZE } from '@/core/constants/size';

export const CalendarContainer = styled(XStack, {
  animation: 'quick',
  animateOnly: ENTER_STYLE_KEY,
  enterStyle: ENTER_STYLE,
  flex: 1,
  justify: 'center',
  rounded: '$4',
  items: 'center',
});

export const DateContainer = styled(Button, {
  unstyled: true,
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

export const DateWrapper = styled(YStack, {
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
  color: '$gray11',

  variants: {
    futureDateColor: {
      ':string': color => {
        return { color };
      },
    },
  } as const,
});
