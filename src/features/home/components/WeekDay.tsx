import React, { memo } from 'react';
import { HorizontalCalendar } from '@/features/home/components/HorizontalCalendar';
import { useTranslation } from 'react-i18next';
import { getMonthKey } from '@/utils/date';
import * as S from './WeekDay.styled';
import Animated, { BounceInUp, Easing } from 'react-native-reanimated';

const AnimatedContainer = Animated.createAnimatedComponent(S.WeekDayContainer);

export const WeekDay = memo(() => {
  const { t } = useTranslation();

  return (
    <AnimatedContainer
      entering={BounceInUp.duration(700).easing(Easing.inOut(Easing.quad))}
    >
      <S.OuterGradientBox>
        <S.InnerGradientBox>
          <S.CurrentMonthBox>
            <S.CurrentMonthText>
              {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
            </S.CurrentMonthText>
          </S.CurrentMonthBox>
          <HorizontalCalendar />
        </S.InnerGradientBox>
      </S.OuterGradientBox>
    </AnimatedContainer>
  );
});
