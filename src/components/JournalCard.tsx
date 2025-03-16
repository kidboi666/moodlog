import { AnimatePresence } from 'tamagui';
import { Journal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import * as S from './JournalCard.styled';
import { ChevronRight, Trash } from '@tamagui/lucide-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  journal: Journal;
  onDelete?: (id: string) => void;
}

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);
const END_POSITION = -100;

export const JournalCard = ({ journal, onDelete }: Props) => {
  const [isPress, setIsPress] = useState(false);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const resetLongPress = () => {
    setIsLongPressed(false);
  };

  const resetPress = () => {
    setIsPress(false);
  };

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(journal.id);
    }
    // 삭제 후 카드를 원래 위치로 되돌림
    position.value = withTiming(0, { duration: 300 });
    onLeft.value = true;
  }, [journal.id, onDelete]);

  const navigateToDetail = useCallback(() => {
    router.push({
      pathname: '/(tabs)/journal/[journalId]',
      params: { journalId: journal.id },
    });

    setTimeout(() => {
      setIsPress(false);
      setIsLongPressed(false);
    }, 100);
  }, [journal.id]);

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .onUpdate(e => {
      if (onLeft.value) {
        position.value = e.translationX < 0 ? e.translationX : 0;
      } else {
        const newPosition = END_POSITION + e.translationX;
        position.value =
          newPosition > 0 ? 0 : Math.max(newPosition, END_POSITION);
      }
    })
    .onEnd(e => {
      const isQuickSwipe = Math.abs(e.velocityX) > 500;

      if (onLeft.value) {
        if (
          position.value < END_POSITION / 2 ||
          (isQuickSwipe && e.velocityX < 0)
        ) {
          position.value = withTiming(END_POSITION, { duration: 300 });
          onLeft.value = false;
        } else {
          position.value = withTiming(0, { duration: 300 });
          runOnJS(resetLongPress)();
        }
      } else {
        if (
          position.value > END_POSITION / 2 ||
          (isQuickSwipe && e.velocityX > 0)
        ) {
          position.value = withTiming(0, { duration: 300 });
          onLeft.value = true;
          runOnJS(resetLongPress)();
        } else {
          position.value = withTiming(END_POSITION, { duration: 300 });
        }
      }
    });

  const tap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      runOnJS(setIsPress)(true);
    })
    .onEnd(() => {
      runOnJS(navigateToDetail)();
    })
    .onFinalize(() => {
      runOnJS(resetPress)();
    });

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      runOnJS(setIsLongPressed)(true);
    })
    .onFinalize(() => {
      if (!isLongPressed) {
        runOnJS(resetLongPress)();
      }
    });

  // 제스처 우선순위 조정: pan은 다른 제스처와 배타적, tap과 longPress는 경쟁
  const composedGesture = Gesture.Exclusive(pan, Gesture.Race(longPress, tap));

  useEffect(() => {
    if (onLeft.value) {
      position.value = withTiming(0, { duration: 300 });
    } else {
      position.value = withTiming(END_POSITION, { duration: 300 });
    }
  }, [onLeft.value]);

  return (
    <S.Container>
      <S.ActionBox>
        <S.DeleteButton icon={Trash} onPress={handleDelete} />
      </S.ActionBox>

      <GestureDetector gesture={composedGesture}>
        <AnimatedCard style={animatedStyles}>
          <S.CardHeader>
            <S.Content>
              <S.MoodBar
                moodColor={
                  emotionTheme[journal.emotion.type][journal.emotion.level]
                }
              />
              <S.JournalContentBox>
                <S.TimeText createdAt={journal.createdAt} />
                <S.JournalContentText>
                  {journal.content ?? ''}
                </S.JournalContentText>
              </S.JournalContentBox>
              <S.RightChevronButton icon={ChevronRight} />
            </S.Content>
          </S.CardHeader>

          {journal.imageUri && (
            <S.CardBackground>
              <S.JournalCoverImage source={{ uri: journal.imageUri }} />
              <AnimatePresence>
                {!isPress && <S.ImageCoverGradient />}
              </AnimatePresence>
            </S.CardBackground>
          )}
        </AnimatedCard>
      </GestureDetector>
    </S.Container>
  );
};
