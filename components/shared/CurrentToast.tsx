import { Toast, useToastState } from '@tamagui/toast'

import { useAppTheme } from '@/store'

import * as S from './CurrentToast.styled'

export const CurrentToast = () => {
  const currentToast = useToastState()
  const { currentTheme } = useAppTheme()

  if (!currentToast || currentToast.isHandledNatively) return null

  return (
    <S.ToastContainer
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      theme={currentTheme === 'dark' ? 'light' : 'dark'}
      presetColor={currentToast.preset}
    >
      <S.ToastContent>
        <S.ToastTitle>{currentToast.title}</S.ToastTitle>
        {!!currentToast.message && (
          <Toast.Description>
            <S.ToastDescription>{currentToast.message}</S.ToastDescription>
          </Toast.Description>
        )}
      </S.ToastContent>
    </S.ToastContainer>
  )
}
