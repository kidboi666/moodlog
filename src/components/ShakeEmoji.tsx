import { Button, H1 } from 'tamagui';
import { useEffect, useState } from 'react';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

interface Props {
  duration?: number;
  emoji: string;
}

export const ShakeEmoji = ({ duration, emoji }: Props) => {
  const [isRotate, setIsRotate] = useState(false);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    let shakeInterval: NodeJS.Timeout;
    let stopTimer: NodeJS.Timeout;

    if (isShaking) {
      shakeInterval = setInterval(() => {
        setIsRotate(prev => !prev);
      }, 300);
    }

    if (duration) {
      stopTimer = setTimeout(() => {
        setIsShaking(false);
        setIsRotate(false);
      }, duration);
    }

    return () => {
      clearInterval(shakeInterval);
      clearTimeout(stopTimer);
    };
  }, [duration, isShaking]);

  return (
    <Button
      unstyled
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      rotate={isRotate ? '40deg' : '0deg'}
      onPress={() => setIsShaking(true)}
      pressStyle={PRESS_STYLE}
    >
      <H1>{emoji}</H1>
    </Button>
  );
};
