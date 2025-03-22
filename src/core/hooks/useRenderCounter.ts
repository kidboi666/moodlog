import { useEffect, useRef } from 'react';

export const useRenderCounter = (componentName = 'Component') => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`${componentName} re rendering count : ${renderCount.current}`);
  });

  return renderCount.current;
};
