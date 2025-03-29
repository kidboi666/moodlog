import { Nullable } from '@/types/utill.types';

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: string;
    isLoading: boolean;
    onDelete: (id: string) => Promise<void>;
    onSuccess?: () => void;
  };
};

export type BottomSheetState = {
  isOpen: boolean;
  type: Nullable<BottomSheetType>;
  props: any;
};

export type BottomSheetAction =
  | {
      type: 'OPEN_BOTTOM_SHEET';
      payload: { type: BottomSheetType; props: any };
    }
  | { type: 'CLOSE_BOTTOM_SHEET' };

export interface BottomSheetContextType {
  state: BottomSheetState;
  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    props: BottomSheetProps[T],
  ) => void;
  hideBottomSheet: () => void;
}
