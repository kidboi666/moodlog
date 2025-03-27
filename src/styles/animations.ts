import { Dimensions } from 'react-native';
import { extractKeysFromAnimationObj } from '@/utils/common';

export const ENTER_STYLE = {
  opacity: 0,
  scale: 0.92,
} as const;
export const EXIT_STYLE = ENTER_STYLE;
export const PRESS_STYLE = {
  bg: '$gray10',
} as const;
export const FALL_STYLE = {
  y: -Dimensions.get('window').height,
} as const;

export const MOUNT_STYLE_KEY = extractKeysFromAnimationObj(ENTER_STYLE);
export const PRESS_STYLE_KEY = extractKeysFromAnimationObj(PRESS_STYLE);
export const FALL_STYLE_KEY = extractKeysFromAnimationObj(FALL_STYLE);
