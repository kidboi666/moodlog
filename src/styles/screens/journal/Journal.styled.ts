import {
  H3,
  Image as TamaguiImage,
  Paragraph,
  styled,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations';
import { ViewContainer as HOSContainer } from '@/core/components/shared/ViewContainer.styleable';

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
    moodColor: {
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

export const MoodTextBox = styled(XStack, {
  gap: '$2',
  self: 'flex-start',
  justify: 'center',
  animation: 'bouncy',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
});

export const MoodLevelText = styled(H3, {
  color: '$gray11',
});

export const MoodTypeText = styled(H3);

export const ImageBox = styled(XStack, {
  animation: 'bouncy',
  width: 300,
  height: 300,
  elevation: '$2',
  mx: 'auto',
  rounded: '$8',
  enterStyle: MOUNT_STYLE,
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
