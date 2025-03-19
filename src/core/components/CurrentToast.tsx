import { Toast, useToastState } from '@tamagui/toast';
import { useAppTheme } from '@/core/store/hooks/useAppTheme';
import * as S from './CurrentToast.styled';

export function CurrentToast() {
  const currentToast = useToastState();
  const { currentTheme } = useAppTheme();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <S.ToastContainer
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      theme={currentTheme === 'dark' ? 'light' : 'dark'}
    >
      <S.ToastContent>
        <S.ToastTitle>{currentToast.title}</S.ToastTitle>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </S.ToastContent>
    </S.ToastContainer>
  );
}
