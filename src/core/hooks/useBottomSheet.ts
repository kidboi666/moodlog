import { useState } from 'react';

export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
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
