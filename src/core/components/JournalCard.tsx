import { AnimatePresence, useControllableState, useEvent } from 'tamagui';
import { emotionTheme } from '@/core/constants/themes';
import * as S from './JournalCard.styled';
import { ChevronRight, Trash } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Emotion } from '@/types/entries';
import { Nullable } from '@/types/utils';

interface Props {
  content: string;
  id: string;
  createdAt: string;
  imageUri: Nullable<string>;
  emotion: Emotion;
  onDelete?: (id: string) => void;
}

const positions = { left: { x: -80 }, right: { x: 0 } };

export const JournalCard = memo(
  ({ content, id, createdAt, imageUri, emotion, onDelete }: Props) => {
    const router = useRouter();
    const [positionI, setPositionI] = useControllableState<'left' | 'right'>({
      strategy: 'most-recent-wins',
      defaultProp: 'right',
    });
    const position = positions[positionI];

    const handleDelete = useEvent(() => {
      if (onDelete) {
        onDelete(id);
      }
      setPositionI('right');
    });

    const handleSwipeLeft = useEvent(() => {
      setPositionI('left');
    });

    const handleSwipeRight = useEvent(() => {
      setPositionI('right');
    });

    const navigateToDetail = useEvent(() => {
      if (positionI === 'left') {
        handleSwipeRight();
      } else {
        router.push({
          pathname: '/journal/[journalId]',
          params: { journalId: id },
        });
      }
    });

    return (
      <S.Container>
        <S.ActionBox>
          <S.DeleteButton icon={Trash} onPress={handleDelete} />
        </S.ActionBox>

        <S.CardContainer
          animation="bouncy"
          onPress={navigateToDetail}
          onLongPress={handleSwipeLeft}
          {...position}
        >
          <S.CardHeader>
            <S.Content>
              <S.MoodBar
                moodColor={emotionTheme[emotion?.type]?.[emotion?.level]}
              />
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
  },
);
