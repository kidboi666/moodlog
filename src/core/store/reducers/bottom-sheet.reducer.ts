import {
  BottomSheetAction,
  BottomSheetState,
} from '@/core/store/types/bottom-sheet.types';

export const bottomSheetReducer = (
  state: BottomSheetState,
  action: BottomSheetAction,
): BottomSheetState => {
  switch (action.type) {
    case 'OPEN_BOTTOM_SHEET':
      return {
        isOpen: true,
        type: action.payload.type,
        snapPoint: action.payload.snapPoint,
        props: action.payload.props,
      };
    case 'CLOSE_BOTTOM_SHEET':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
