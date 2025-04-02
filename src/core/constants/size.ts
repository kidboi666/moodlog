import { Platform } from 'react-native';

export const CONTAINER_HORIZONTAL_PADDING = 18;

export const CONTAINER_MARGIN_TOP = 28;

export const CONTAINER_PADDING_BOTTOM = 180;

export const CALENDAR_SCROLL_SIZE = 44;

export const HOME_HEADER_LINE_HEIGHT = 48;

export const RECORD_UNIT_LINE_HEIGHT = 26;

export const RECORD_CARD_HEIGHT = 180;

export const RECORD_CARD_EXPANDED_HEIGHT = 450;

export const RECORD_CARD_EXPANDED_HEIGHT_MEDIUM = 380;

export const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 60 : 80;

export const DELETE_JOURNAL_SNAP_POINTS = Platform.OS === 'ios' ? [30] : [26];

export const SELECT_MOOD_SNAP_POINTS = Platform.OS === 'ios' ? [80] : [70];

export const JOURNAL_WRITE_SNAP_POINTS = Platform.OS === 'ios' ? [90] : [86];
