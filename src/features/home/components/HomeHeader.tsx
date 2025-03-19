import { Menu } from '@tamagui/lucide-icons';
import { HeaderContainer } from '@/core/components/HeaderContainer.styleable';
import { useBottomModal } from '@/core/hooks/useBottomModal';
import { BottomModal } from '@/core/components/modals/BottomModal';
import { DevContainer } from '@/core/components/DevContainer';
import * as S from './HomeHeader.styled';
import { memo } from 'react';

export const HomeHeader = memo(() => {
  const { modalRef, openModal } = useBottomModal();
  return (
    <>
      <HeaderContainer>
        <S.DevMenuButton icon={Menu} onPress={openModal} />
        <S.RestBox />
      </HeaderContainer>

      <BottomModal ref={modalRef}>
        <DevContainer />
      </BottomModal>
    </>
  );
});
