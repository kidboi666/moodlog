import { useState } from 'react';
import { Keyboard } from 'react-native';

export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
    Keyboard.dismiss();
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    openSheet,
    closeSheet,
  };
};
