import { AnimatePresence, useControllableState, useEvent } from 'tamagui';
import { moodTheme } from '@/core/constants/themes';
import * as S from './JournalCard.styled';
import { ChevronLeft, ChevronRight, Trash } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Nullable } from '@/types/utill.types';
import { Mood } from '@/types/mood.types';
import { CardPosition } from '@/types/journal.types';
import { memo } from 'react';

interface Props {
  content: string;
  id: string;
  createdAt: string;
  imageUri: Nullable<string>;
  mood: Mood;
  onDeletePress: (id: string) => void;
}

export const JournalCard = memo(
  ({ content, id, createdAt, imageUri, mood, onDeletePress }: Props) => {
    const router = useRouter();
    const [cardPosition, setCardPosition] = useControllableState<CardPosition>({
      strategy: 'most-recent-wins',
      defaultProp: CardPosition.RIGHT,
    });

    const handleSwipeLeft = useEvent(() => {
      setCardPosition(CardPosition.LEFT);
    });

    const handleSwipeRight = useEvent(() => {
      setCardPosition(CardPosition.RIGHT);
    });

    const toggleSwipe = useEvent(() => {
      setCardPosition(
        cardPosition === CardPosition.LEFT
          ? CardPosition.RIGHT
          : CardPosition.LEFT,
      );
    });

    const handlePress = () => {
      if (cardPosition === CardPosition.LEFT) {
        handleSwipeRight();
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

          <S.CardContainer
            onPress={handlePress}
            onLongPress={handleSwipeLeft}
            cardPosition={cardPosition}
          >
            <S.CardHeader>
              <S.Content>
                <S.MoodBar moodColor={moodTheme[mood?.type]?.[mood?.level]} />
                <S.JournalContentBox>
                  <S.TimeText createdAt={createdAt} />
                  <S.JournalContentText>{content}</S.JournalContentText>
                </S.JournalContentBox>
                <S.RightChevronButton
                  icon={
                    cardPosition === CardPosition.RIGHT
                      ? ChevronRight
                      : ChevronLeft
                  }
                  onPress={toggleSwipe}
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
          </S.CardContainer>
        </S.Container>
      </>
    );
  },
);
