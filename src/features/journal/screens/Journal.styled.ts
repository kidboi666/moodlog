import { Container as HOSContainer } from '@/core/components/layouts/containers/Container';
import {
  H3,
  Image as TamaguiImage,
  Paragraph,
  styled,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/core/constants/styles';

export const ViewContainer = styled(HOSContainer, {
  pl: 0,
  gap: '$6',
});

export const XStackContainer = styled(XStack, {
  gap: '$3',
});

export const MoodBar = styled(View, {
  width: '3%',
  animation: 'medium',
  animateOnly: ['transform'],
  enterStyle: { x: -20 },
  borderTopRightRadius: '$4',
  borderBottomRightRadius: '$4',

  variants: {
    emotionColor: {
      ':string': bg => {
        return { bg };
      },
    },
  },
});

export const ContentBox = styled(YStack, {
  flex: 1,
  gap: '$4',
});

export const EmotionTextBox = styled(XStack, {
  gap: '$2',
  self: 'flex-start',
  justify: 'center',
  animation: 'bouncy',
  animateOnly: ENTER_STYLE_KEY,
  enterStyle: ENTER_STYLE,
});

export const EmotionLevelText = styled(H3, {
  color: '$gray11',
});

export const EmotionTypeText = styled(H3);

export const ImageBox = styled(XStack, {
  animation: 'bouncy',
  width: 300,
  height: 300,
  elevation: '$2',
  mx: 'auto',
  rounded: '$8',
  enterStyle: ENTER_STYLE,
});

export const Image = styled(TamaguiImage, {
  width: '100%',
  height: '100%',
  rounded: '$8',
});

export const ContentText = styled(Paragraph, {
  fontWeight: '300',

  variants: {
    fontSize: {
      ':string': fontSize => {
        return { fontSize };
      },
    },
  },
});
