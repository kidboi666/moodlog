import { AnimatePresence, useControllableState, useEvent } from 'tamagui';
import { moodTheme } from '@/core/constants/themes';
import * as S from './JournalCard.styled';
import { ChevronRight, Trash } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Nullable } from '@/types/common.types';
import { Mood } from '@/types/mood.types';
import { CardPosition } from '@/types/journal.types';

interface Props {
  content: string;
  id: string;
  createdAt: string;
  imageUri: Nullable<string>;
  mood: Mood;
  onDelete?: (id: string) => void;
}

const positions = { left: { x: -80 }, right: { x: 0 } };

export const JournalCard = ({
  content,
  id,
  createdAt,
  imageUri,
  mood,
  onDelete,
}: Props) => {
  const router = useRouter();
  const [positionI, setPositionI] = useControllableState<CardPosition>({
    strategy: 'most-recent-wins',
    defaultProp: CardPosition.RIGHT,
  });
  const position = positions[positionI];

  const handleDelete = useEvent(() => {
    if (onDelete) {
      onDelete(id);
    }
    setPositionI(CardPosition.RIGHT);
  });

  const handleSwipeLeft = useEvent(() => {
    setPositionI(CardPosition.LEFT);
  });

  const handleSwipeRight = useEvent(() => {
    setPositionI(CardPosition.RIGHT);
  });

  const handlePress = useEvent(() => {
    if (positionI === CardPosition.LEFT) {
      handleSwipeRight();
    } else {
      router.push({
        pathname: '/journal/[id]',
        params: { id },
      });
    }
  });

  return (
    <S.Container>
      <AnimatePresence>
        {positionI === 'left' && (
          <S.ActionBox>
            <S.DeleteButton icon={Trash} onPress={handleDelete} />
          </S.ActionBox>
        )}
      </AnimatePresence>

      <S.CardContainer
        onPress={handlePress}
        onLongPress={handleSwipeLeft}
        {...position}
      >
        <S.CardHeader>
          <S.Content>
            <S.MoodBar moodColor={moodTheme[mood?.type]?.[mood?.level]} />
            <S.JournalContentBox>
              <S.TimeText createdAt={createdAt} />
              <S.JournalContentText>{content ?? ''}</S.JournalContentText>
            </S.JournalContentBox>
            <S.RightChevronButton icon={ChevronRight} />
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
  );
};
