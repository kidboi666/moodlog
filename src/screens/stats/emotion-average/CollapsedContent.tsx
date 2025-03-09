import { XStack, YStack } from 'tamagui';
import { Maximize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { SignatureEmotion } from '@/types/entries';
import { Nullable } from '@/types/utils';
import * as S from './CollapsedContent.styled';

interface Props {
  hasSignatureEmotion: boolean;
  signatureEmotion: Nullable<SignatureEmotion>;
}

export const CollapsedContent = ({
  hasSignatureEmotion,
  signatureEmotion,
}: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.CardTitle signatureMood={hasSignatureEmotion}>
          {t('records.stats.emotion.title')}
        </S.CardTitle>
        <S.CardDescription signatureMood={hasSignatureEmotion}>
          {t('records.stats.emotion.description')}
        </S.CardDescription>
      </S.YStackContainer>
      <YStack>
        <XStack>
          <S.EmotionText signatureMood={hasSignatureEmotion}>
            {hasSignatureEmotion
              ? t(`emotions.types.${signatureEmotion?.type}`)
              : t('common.fallback.text')}
          </S.EmotionText>
          <S.MaximizeButton icon={Maximize2} />
        </XStack>
      </YStack>
    </S.ViewContainer>
  );
};
