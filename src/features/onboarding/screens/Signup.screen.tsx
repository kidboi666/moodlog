import { H1 } from 'tamagui';
import { Container } from '@/core/components/Container.styleable';
import { FadeIn } from '@/core/components/FadeIn.styleable';
import { useRouter } from 'expo-router';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { PARAGRAPH_DELAY } from '@/core/constants/time';
import * as S from './Signup.styled';
import { useStepProgress } from '@/core/store/contexts/step-progress.context';
import { useUser } from '@/core/store/contexts/user.context';
import { useApp } from '@/core/store/contexts/app.context';

export const SignupScreen = () => {
  const { goToPrevStep, currentStep } = useStepProgress();
  const { draftUserName, registerUser } = useUser();
  const { isInitialApp } = useApp();
  const { t } = useTranslation();
  const router = useRouter();

  const handlePrevStep = () => {
    if (currentStep === 2) {
      goToPrevStep();
      router.back();
    }
  };

  const handleSubmit = (userName: string) => {
    registerUser(userName);
    if (isInitialApp) {
      router.replace('/');
    }
  };

  return (
    <Container edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
          <H1>{t('onboarding.signup.title')}</H1>
        </FadeIn>
        <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
          <S.BenefitsContainer>
            <S.BenefitTitle>{t('onboarding.signup.ota')}</S.BenefitTitle>
            <S.BenefitsBox>
              <S.BenefitText>
                • {t('onboarding.signup.benefits.sync')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.signup.benefits.backup')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.signup.benefits.statistics')}
              </S.BenefitText>
            </S.BenefitsBox>
          </S.BenefitsContainer>
        </FadeIn>
        <S.RestBox />
        <FadeIn delay={PARAGRAPH_DELAY.FOURTH}>
          <S.ButtonContainer>
            <S.PrevButton onPress={handlePrevStep} icon={ArrowLeft}>
              {t('common.button.prev')}
            </S.PrevButton>
            <S.ConfirmButton onPress={() => handleSubmit(draftUserName)}>
              {t('common.button.confirm')}
            </S.ConfirmButton>
          </S.ButtonContainer>
        </FadeIn>
      </S.YStackContainer>
    </Container>
  );
};
