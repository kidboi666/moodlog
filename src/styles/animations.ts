import { Dimensions } from 'react-native';
import { extractKeysFromAnimationObj } from '@/utils/common';

export const MOUNT_STYLE = {
  opacity: 0,
  scale: 0.92,
} as const;

export const PRESS_STYLE = {
  bg: '$backgroundFocus',
  borderColor: '$borderColorPress',
  color: '$colorPress',
} as const;

export const FALL_STYLE = {
  y: -Dimensions.get('window').height,
} as const;

export const MOUNT_STYLE_KEY = extractKeysFromAnimationObj(MOUNT_STYLE);

export const PRESS_STYLE_KEY = extractKeysFromAnimationObj(PRESS_STYLE);

export const FALL_STYLE_KEY = extractKeysFromAnimationObj(FALL_STYLE);
