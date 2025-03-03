import { Dimensions } from 'react-native';

/**
 * ANIMATIONS
 */
export const ENTER_STYLE = {
  opacity: 0,
  scale: 0.85,
  y: 10,
};

export const ENTER_STYLE_KEY = ['opacity', 'transform'];

export const PRESS_STYLE = {
  opacity: 0.5,
  scale: 0.925,
};

export const PRESS_STYLE_KEY = ['opacity', 'transform'];

export const FALL_STYLE = {
  y: -Dimensions.get('window').height,
};

export const FALL_STYLE_KEY = ['transform'];

export const PARAGRAPH_DELAY = {
  FIRST: 1000,
  SECOND: 2000,
  THIRD: 3000,
  FOURTH: 4000,
} as const;

export const CARD_DELAY = {
  FIRST: 300,
  SECOND: 600,
  THIRD: 900,
  FOURTH: 1200,
} as const;
