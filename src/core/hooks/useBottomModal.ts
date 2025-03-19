import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Keyboard } from 'react-native';

export const useBottomModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    Keyboard.dismiss();
    modalRef.current?.present();
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  return {
    modalRef,
    openModal,
    closeModal,
  };
};
