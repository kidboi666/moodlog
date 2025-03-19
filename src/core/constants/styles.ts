import { Dimensions } from 'react-native';

/**
 * ANIMATIONS
 */
export const ENTER_STYLE = {
  opacity: 0,
  scale: 0.85,
} as const;

export const ENTER_STYLE_KEY = ['opacity', 'transform'];

export const PRESS_STYLE = {
  bg: '$gray10',
} as const;

export const PRESS_STYLE_KEY = ['backgroundColor'];

export const FALL_STYLE = {
  y: -Dimensions.get('window').height,
} as const;

export const FALL_STYLE_KEY = ['transform'];
