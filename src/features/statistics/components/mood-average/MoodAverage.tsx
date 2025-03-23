import { Nullable } from '@/types/common.types';
import { CollapsedContent } from '@/features/statistics/components/mood-average/CollapsedContent';
import { ExpandedContent } from '@/features/statistics/components/mood-average/ExpandedContent';
import * as S from './MoodAverage.styled';
import { MoodLevel, MoodType, SignatureMood } from '@/types/mood.types';
import { useControllableState, useEvent } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/core/constants/size';
import { ExpansionState } from '@/types/statistic.types';
import { moodTheme } from '@/core/constants/themes';

interface Props {
  signatureMood: Nullable<SignatureMood>;
}

const heights = {
  expanded: {
    height: RECORD_CARD_EXPANDED_HEIGHT,
  },
  collapsed: {
    height: RECORD_CARD_HEIGHT,
  },
} as const;

export const MoodAverage = ({ signatureMood }: Props) => {
  const [expansionState, setExpansionState] =
    useControllableState<ExpansionState>({
      strategy: 'most-recent-wins',
      defaultProp: ExpansionState.COLLAPSED,
    });
  const animatedStyle = heights[expansionState];
  const isExpanded = expansionState === ExpansionState.EXPANDED;

  const handleIsExpandedChange = useEvent(() => {
    setExpansionState(prev =>
      prev === ExpansionState.EXPANDED
        ? ExpansionState.COLLAPSED
        : ExpansionState.EXPANDED,
    );
  });

  const hasSignatureMood = signatureMood ? signatureMood?.count > 0 : false;

  return (
    <S.CardContainer
      moodColor={
        isExpanded
          ? '$gray4'
          : hasSignatureMood
            ? moodTheme[signatureMood?.type as MoodType][MoodLevel.FULL]
            : '$gray4'
      }
      onPress={handleIsExpandedChange}
      {...animatedStyle}
    >
      {isExpanded ? (
        <ExpandedContent />
      ) : (
        <CollapsedContent
          hasSignatureMood={hasSignatureMood}
          signatureMood={signatureMood}
        />
      )}
    </S.CardContainer>
  );
};
