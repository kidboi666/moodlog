import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, PropsWithChildren } from 'react';
import { useTheme } from 'tamagui';
import { CONTAINER_SPACING } from '@/core/constants/size';
import { Keyboard } from 'react-native';

interface Props extends BottomSheetModalProps {}

export const BottomModal = forwardRef<
  BottomSheetModal,
  PropsWithChildren<Props>
>(({ children, ...props }, ref) => {
  const theme = useTheme();
  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      index={0}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onChange={() => Keyboard.dismiss()}
      backgroundStyle={{
        backgroundColor: theme.background.val,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.gray12.val,
      }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
      {...props}
    >
      <BottomSheetView
        style={{
          padding: CONTAINER_SPACING,
          paddingBottom: CONTAINER_SPACING * 2,
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
