import { AnimatePresence } from 'tamagui';
import { moodTheme } from '@/core/constants/themes';
import * as S from './JournalCard.styled';
import { ChevronLeft, ChevronRight, Trash } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Nullable } from '@/types/utill.types';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { memo, useCallback } from 'react';
import { useAxisAnimationWithState } from '@/core/hooks/useAxisAnimationWithState';
import { Position } from '@/types/app.types';
import Animated from 'react-native-reanimated';
import { useCardGesture } from '@/core/hooks/useCardGesture';

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

interface Props {
  content: string;
  id: string;
  createdAt: string;
  imageUri: Nullable<string>;
  moodType: MoodType;
  moodLevel: MoodLevel;
  onDeletePress: (id: string) => void;
}

export const JournalCard = memo(
  ({
    content,
    id,
    createdAt,
    imageUri,
    moodType,
    moodLevel,
    onDeletePress,
  }: Props) => {
    const router = useRouter();
    const {
      state: cardPosition,
      animatedStyle,
      toggleState,
      changeStateByCondition,
    } = useAxisAnimationWithState('x', {
      defaultState: Position.CENTER,
      nextState: Position.LEFT,
      startValue: 0,
      endValue: -80,
      duration: 300,
    });

    const isOpenCard = cardPosition === Position.LEFT;

    const handleSwipeLeft = useCallback(() => {
      if (cardPosition === Position.CENTER) {
        changeStateByCondition(true);
      }
    }, [cardPosition, toggleState]);

    const handleSwipeRight = useCallback(() => {
      if (cardPosition === Position.LEFT) {
        changeStateByCondition(false);
      }
    }, [cardPosition, toggleState]);

    const { gesture, GestureWrapper } = useCardGesture({
      onSwipeLeft: handleSwipeLeft,
      onSwipeRight: handleSwipeRight,
      onLongPress: () =>
        changeStateByCondition(cardPosition === Position.CENTER),
    });

    const handlePress = () => {
      if (isOpenCard) {
        toggleState();
      } else {
        router.push({
          pathname: '/journal/[id]',
          params: { id },
        });
      }
    };

    return (
      <>
        <S.Container>
          <AnimatePresence>
            {cardPosition === 'left' && (
              <S.ActionBox>
                <S.DeleteButton
                  icon={Trash}
                  onPress={() => onDeletePress(id)}
                />
              </S.ActionBox>
            )}
          </AnimatePresence>

          <GestureWrapper gesture={gesture}>
            <AnimatedCard onPress={handlePress} style={animatedStyle}>
              <S.CardHeader>
                <S.Content>
                  <S.MoodBar moodColor={moodTheme[moodType][moodLevel]} />
                  <S.JournalContentBox>
                    <S.TimeText createdAt={createdAt} />
                    <S.JournalContentText>{content}</S.JournalContentText>
                  </S.JournalContentBox>
                  <S.RightChevronButton
                    icon={
                      cardPosition === Position.CENTER
                        ? ChevronRight
                        : ChevronLeft
                    }
                    onPress={() => toggleState()}
                  />
                </S.Content>
              </S.CardHeader>

              {imageUri && (
                <S.CardBackground>
                  <S.JournalCoverImage source={{ uri: imageUri }} />
                  <AnimatePresence>
                    <S.ImageCoverGradient />
                  </AnimatePresence>
                </S.CardBackground>
              )}
            </AnimatedCard>
          </GestureWrapper>
        </S.Container>
      </>
    );
  },
);
