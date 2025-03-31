import { H1 } from 'tamagui';
import { memo, useEffect, useState } from 'react';
import * as S from './ShakeEmoji.styled';

interface Props {
  duration?: number;
  emoji: string;
}

export const ShakeEmoji = memo(({ duration, emoji }: Props) => {
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
    <S.EmojiButton
      isRotate={isRotate}
      onPress={() => setIsShaking(prev => !prev)}
    >
      <H1>{emoji}</H1>
    </S.EmojiButton>
  );
});
