import { HeaderContainer } from '@/core/components/HeaderContainer.styleable';
import * as S from './SettingHeader.styled';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export const SettingHeader = () => {
  const router = useRouter();

  return (
    <HeaderContainer edges={['top', 'bottom']}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
      <S.RestBox />
    </HeaderContainer>
  );
};
