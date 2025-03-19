import { HeaderContainer } from '@/core/components/HeaderContainer.styleable';
import { router } from 'expo-router';
import * as S from './SettingHeader.styled';
import { ArrowLeft } from '@tamagui/lucide-icons';

export const SettingHeader = () => {
  return (
    <HeaderContainer>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
      <S.RestBox />
    </HeaderContainer>
  );
};
