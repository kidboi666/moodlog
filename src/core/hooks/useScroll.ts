import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigation = useNavigation();

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentPosition = event.nativeEvent.contentOffset.y;
      setScrollPosition(currentPosition);
    },
    [],
  );

  const resetScroll = useCallback(() => {
    setScrollPosition(0);
  }, []);

  useEffect(() => {
    return navigation.addListener('state', () => resetScroll());
  }, [navigation]);

  return {
    scrollPosition,
    onScroll: handleScroll,
    resetScroll,
  };
};
