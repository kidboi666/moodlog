import { XStack, YStack } from 'tamagui';
import { Maximize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/types/common.types';
import * as S from './CollapsedContent.styled';
import { MoodLevel, SignatureMood } from '@/types/mood.types';
import { getMoodTheme } from '@/core/utils/common';

interface Props {
  hasSignatureMood: boolean;
  signatureMood: Nullable<SignatureMood>;
}

export const CollapsedContent = ({
  hasSignatureMood,
  signatureMood,
}: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer
      moodColor={
        hasSignatureMood
          ? getMoodTheme(signatureMood!.type, MoodLevel.FULL)
          : '$gray5'
      }
    >
      <S.YStackContainer>
        <S.CardTitle signatureMood={hasSignatureMood}>
          {t('statistics.mood.title')}
        </S.CardTitle>
        <S.CardDescription signatureMood={hasSignatureMood}>
          {t('statistics.mood.description')}
        </S.CardDescription>
      </S.YStackContainer>
      <YStack>
        <XStack>
          <S.MoodText signatureMood={hasSignatureMood}>
            {hasSignatureMood
              ? t(`moods.types.${signatureMood?.type}`)
              : t('common.fallback.text')}
          </S.MoodText>
          <S.MaximizeButton icon={Maximize2} />
        </XStack>
      </YStack>
    </S.ViewContainer>
  );
};
