import { Container } from '@/core/components/Container.styleable';
import { Input } from 'tamagui';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { router } from 'expo-router';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { PARAGRAPH_DELAY } from '@/core/constants/time';
import * as S from './Nickname.styled';
import { useStepProgress } from '@/core/store/contexts/step-progress.context';
import { useUser } from '@/core/store/contexts/user.context';

export const NicknameScreen = () => {
  const { draftUserName, onDraftUserNameChange } = useUser();
  const { t } = useTranslation();
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress();

  const handlePrevStep = () => {
    if (currentStep === 1) {
      goToPrevStep();
      router.back();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      goToNextStep();
      router.push('/(onboarding)/signup');
    }
  };

  return (
    <Container edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
          <S.Title>{t('onboarding.nickname.title')}</S.Title>
        </FadeIn>
        <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
          <S.Description>{t('onboarding.nickname.description')}</S.Description>
        </FadeIn>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <Input
            value={draftUserName}
            onChangeText={onDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
        </FadeIn>
      </S.YStackContainer>
      <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
        <S.ButtonContainer>
          <S.PrevButton icon={ArrowLeft} onPress={handlePrevStep}>
            {t('common.button.prev')}
          </S.PrevButton>
          <S.NextButton
            disabled={!draftUserName}
            onPress={handleNextStep}
            iconAfter={ArrowRight}
          >
            {t('common.button.next')}
          </S.NextButton>
        </S.ButtonContainer>
      </FadeIn>
    </Container>
  );
};
