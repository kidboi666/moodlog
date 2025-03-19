import { useEffect } from 'react';

export const useDebouncedEffect = <T>(
  effect: any,
  deps: T[],
  delay: number = 500,
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps]);
};
