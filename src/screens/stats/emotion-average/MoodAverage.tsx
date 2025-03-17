import { SignatureEmotion } from '@/types/entries';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { memo, useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { Nullable } from '@/types/utils';
import { EmotionLevel } from '@/types/enums';
import { CollapsedContent } from '@/screens/stats/emotion-average/CollapsedContent';
import { ExpandedContent } from '@/screens/stats/emotion-average/ExpandedContent';
import { getEmotionTheme } from '@/utils/common';
import * as S from './EmotionAverage.styled';

interface Props {
  signatureEmotion: Nullable<SignatureEmotion>;
}

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

export const MoodAverage = memo(({ signatureEmotion }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const hasSignatureEmotion = signatureEmotion
    ? signatureEmotion?.count > 0
    : false;

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
    transform: [{ scale: withSpring(isTouched.value ? 0.9 : 1) }],
    opacity: withSpring(isTouched.value ? 0.6 : 1),
  }));

  return (
    <AnimatedCard
      moodColor={
        isExpanded
          ? '$gray4'
          : hasSignatureEmotion
            ? getEmotionTheme(signatureEmotion!.type, EmotionLevel.FULL)
            : '$gray5'
      }
      onPress={() => setIsExpanded(prev => !prev)}
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      style={animatedStyle}
    >
      {isExpanded ? (
        <ExpandedContent />
      ) : (
        <CollapsedContent
          hasSignatureEmotion={hasSignatureEmotion}
          signatureEmotion={signatureEmotion}
        />
      )}
    </AnimatedCard>
  );
});
