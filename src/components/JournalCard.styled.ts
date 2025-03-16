import {
  Button,
  Card,
  Image,
  Paragraph,
  styled,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { RenderTime } from '@/components/RenderTime';
import { LinearGradient } from 'tamagui/linear-gradient';

export const Container = styled(View, {
  position: 'relative',
  width: '100%',
});

export const CardContainer = styled(Card, {
  group: true,
  flex: 1,
  bg: '$gray4',
  animation: 'quick',
  enterStyle: ENTER_STYLE,
  pressStyle: PRESS_STYLE,
  rounded: '$8',
});

export const CardHeader = styled(Card.Header, {
  padded: true,
});

export const Content = styled(XStack, {
  flex: 1,
  gap: '$4',
  items: 'center',
});

export const MoodBar = styled(View, {
  width: '$0.75',
  my: 'auto',
  height: '75%',
  rounded: '$8',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});

export const JournalContentBox = styled(YStack, {
  flex: 1,
  gap: '$2',
});

export const JournalContentText = styled(Paragraph, {
  color: '$gray12',
  flex: 1,
  numberOfLines: 4,
});

export const TimeText = styled(RenderTime, {
  fontSize: '$7',
  lineHeight: 20,
  color: '$gray9',
  fontWeight: '800',
});

export const CardBackground = styled(Card.Background, {
  rounded: '$8',
});

export const JournalCoverImage = styled(Image, {
  animation: 'medium',
  opacity: 0.6,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const ImageCoverGradient = styled(LinearGradient, {
  animation: 'quick',
  exitStyle: { opacity: 0 },
  width: '100%',
  height: '100%',
  colors: ['$gray5', 'rgba(0,0,0,0)'],
  start: [0, 0],
  end: [2.4, 0],
  position: 'absolute',
  pointerEvents: 'none',
});

export const RightChevronButton = styled(Button, {
  unstyled: true,
  p: '$4',
});

export const ActionBox = styled(XStack, {
  r: 0,
  position: 'absolute',
  height: '100%',
  items: 'center',
  justify: 'center',
  px: 16,
  z: -1,
});

export const DeleteButton = styled(Button, {
  size: '$3',
  circular: true,
  chromeless: true,
  scaleIcon: 1.5,
  bg: '$red10',
  color: 'white',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.5,
  elevation: 2,
  pressStyle: { bg: '$red11' },
});
