import { extractKeysFromAnimationObj } from '@/utils/common';

export const MOUNT_STYLE = {
  opacity: 0,
  scale: 0.92,
} as const;

export const PRESS_STYLE = {
  bg: '$backgroundFocus',
  borderColor: '$borderColorPress',
  color: '$colorPress',
  scale: 0.92,
} as const;

export const MOUNT_STYLE_KEY = extractKeysFromAnimationObj(MOUNT_STYLE);

export const PRESS_STYLE_KEY = extractKeysFromAnimationObj(PRESS_STYLE);
