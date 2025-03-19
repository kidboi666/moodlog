import { useTranslation } from 'react-i18next';
import * as S from './GardenTitleHeader.styled';
import { memo } from 'react';

export const GardenTitleHeader = memo(() => {
  const { t } = useTranslation();
  return (
    <S.GardenTitleHeaderContainer>
      <S.GardenTitle>{t('entries.garden.title')}</S.GardenTitle>
      <S.GardenDescription>
        {t('entries.garden.description')}
      </S.GardenDescription>
    </S.GardenTitleHeaderContainer>
  );
});
