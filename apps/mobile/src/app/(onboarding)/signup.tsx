import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { useApp } from '@/core/store/contexts/app.context';
import { useStepProgress } from '@/core/store/contexts/step-progress.context';
import { useUser } from '@/core/store/contexts/user.context';
import * as S from '@/styles/screens/onboarding/Signup.styled';
import { ArrowLeft, Check } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { H1, Spinner } from 'tamagui';

export default function Screen() {
  const router = useRouter();
  const { goToPrevStep, currentStep } = useStepProgress();
  const { draftUserName, registerUser, isLoading } = useUser();
  const { firstLaunchDate } = useApp();
  const { t } = useTranslation();

  const handlePrevStep = () => {
    if (currentStep === 2) {
      goToPrevStep();
      router.back();
    }
  };

  const handleSubmit = (userName: string) => {
    registerUser(userName);
  };

  useEffect(() => {
    if (firstLaunchDate) {
      router.replace('/(tabs)');
    }
  });

  return (
    <ViewContainer edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <H1>{t('onboarding.signup.title')}</H1>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
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
                • {t('onboarding.signup.benefits.stats')}
              </S.BenefitText>
            </S.BenefitsBox>
          </S.BenefitsContainer>
        </FadeIn>
        <S.RestBox />
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <S.ButtonContainer>
            <S.PrevButton onPress={handlePrevStep} icon={ArrowLeft}>
              {t('common.button.prev')}
            </S.PrevButton>
            <S.ConfirmButton
              disabled={isLoading}
              onPress={() => handleSubmit(draftUserName)}
            >
              {isLoading || firstLaunchDate ? <Spinner /> : <Check />}
              {t('common.button.confirm')}
            </S.ConfirmButton>
          </S.ButtonContainer>
        </FadeIn>
      </S.YStackContainer>
    </ViewContainer>
  );
}
