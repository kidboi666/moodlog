import {
  H1,
  H4,
  Separator as TamaguiSeparator,
  styled,
  XStack,
  YStack,
} from 'tamagui';
import { HOME_HEADER_LINE_HEIGHT } from '@/core/constants/size';

export const ContentHeaderContainer = styled(YStack, {
  gap: '$4',
});

export const WelcomeEmojiBox = styled(XStack, {
  gap: '$2',
  items: 'flex-end',
});

export const WelcomeTitleText = styled(H1, {
  lineHeight: HOME_HEADER_LINE_HEIGHT,
});

export const HowAreYouText = styled(H4, {
  color: '$gray11',
});

export const Separator = styled(TamaguiSeparator, {
  borderColor: 'transparent',
  mb: '$4',
});
