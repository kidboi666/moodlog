import { AnimatePresence, useControllableState, useEvent } from 'tamagui';
import { Journal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { router } from 'expo-router';
import * as S from './JournalCard.styled';
import { ChevronRight, Trash } from '@tamagui/lucide-icons';

interface Props {
  journal: Journal;
  onDelete?: (id: string) => void;
}

const positions = { left: { x: -80 }, right: { x: 0 } };

export const JournalCard = ({ journal, onDelete }: Props) => {
  const [positionI, setPositionI] = useControllableState<'left' | 'right'>({
    strategy: 'most-recent-wins',
    defaultProp: 'right',
  });
  const position = positions[positionI];

  const handleDelete = useEvent(() => {
    if (onDelete) {
      onDelete(journal.id);
    }
    setPositionI('right');
  });

  const handleSwipeLeft = useEvent(() => {
    setPositionI('left');
  });

  const handleSwipeRight = useEvent(() => {
    if (positionI === 'left') {
      setPositionI('right');
    }
  });

  const navigateToDetail = useEvent(() => {
    if (positionI === 'left') {
      handleSwipeRight();
    } else {
      router.push({
        pathname: '/(tabs)/journal/[journalId]',
        params: { journalId: journal.id },
      });
    }
  });

  return (
    <S.Container>
      <S.ActionBox>
        <S.DeleteButton icon={Trash} onPress={handleDelete} />
      </S.ActionBox>

      <S.CardContainer
        animation="quick"
        onPress={navigateToDetail}
        onLongPress={handleSwipeLeft}
        {...position}
      >
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
              <S.ImageCoverGradient />
            </AnimatePresence>
          </S.CardBackground>
        )}
      </S.CardContainer>
    </S.Container>
  );
};
