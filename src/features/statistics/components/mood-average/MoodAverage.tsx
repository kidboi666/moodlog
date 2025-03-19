import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { memo, useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';
import { Nullable } from '@/core/types/common.types';
import { CollapsedContent } from '@/features/statistics/components/mood-average/CollapsedContent';
import { ExpandedContent } from '@/features/statistics/components/mood-average/ExpandedContent';
import { getMoodTheme } from '@/core/utils/common';
import * as S from './MoodAverage.styled';
import { MoodLevel, SignatureMood } from '@/core/types/mood.types';

interface Props {
  signatureMood: Nullable<SignatureMood>;
}

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

export const MoodAverage = memo(({ signatureMood }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const hasSignatureMood = signatureMood ? signatureMood?.count > 0 : false;

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
          : hasSignatureMood
            ? getMoodTheme(signatureMood!.type, MoodLevel.FULL)
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
          hasSignatureMood={hasSignatureMood}
          signatureMood={signatureMood}
        />
      )}
    </AnimatedCard>
  );
});
