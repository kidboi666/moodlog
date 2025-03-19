import { ReactNode, useEffect, useState } from 'react';

interface Props {
  item: ReactNode;
  delay: number;
}

interface FadeInResult {
  isVisible: boolean;
  item: ReactNode;
}

export const useFadeIn = ({ delay, item }: Props): FadeInResult => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return {
    isVisible,
    item,
  };
};
