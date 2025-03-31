import { useTranslation } from 'react-i18next';
import { useStepProgress } from '@/core/store/contexts/step-progress.context';
import { router } from 'expo-router';
import * as S from '@/styles/screens/onboarding/Welcome.styled';
import { H1, H2 } from 'tamagui';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji';
import { ArrowRight } from '@tamagui/lucide-icons';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';

export default function Screen() {
  const { t } = useTranslation();
  const { currentStep, goToNextStep } = useStepProgress();

  const handleClickNextButton = () => {
    if (currentStep === 0) {
      goToNextStep();
      router.push('/(onboarding)/nickname');
    }
  };

  return (
    <ViewContainer edges={['bottom']}>
      <S.WelcomeContainer>
        <S.WelcomeContent>
          <H1>뭘봐이새끼야</H1>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
            <S.TitleBox>
              <H1>{t('onboarding.welcome.title')}</H1>
              <ShakeEmoji emoji="👋" />
            </S.TitleBox>
          </FadeIn>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
            <S.DescriptionBox>
              <S.Description1>
                {t('onboarding.welcome.description')}
              </S.Description1>
              <S.Description2>
                {t('onboarding.welcome.description2')}
              </S.Description2>
            </S.DescriptionBox>
          </FadeIn>
        </S.WelcomeContent>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <H2>{t('onboarding.welcome.go')}</H2>
        </FadeIn>
      </S.WelcomeContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.NextButton iconAfter={ArrowRight} onPress={handleClickNextButton}>
          {t('common.button.next')}
        </S.NextButton>
      </FadeIn>
    </ViewContainer>
  );
}
