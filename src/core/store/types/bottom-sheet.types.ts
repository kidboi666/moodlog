import { Nullable } from '@/types/utill.types';
import { Mood, MoodLevel, MoodType } from '@/types/mood.types';
import { Draft } from '@/types/journal.types';

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SELECT_MOOD = 'SELECT_MOOD',
  JOURNAL_WRITE = 'JOURNAL_WRITE',
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: string;
    isLoading: boolean;
    onDelete: (id: string) => Promise<void>;
    onSuccess?: () => void;
    hideBottomSheet: () => void;
  };
  [BottomSheetType.SELECT_MOOD]: {
    onPress: (mood: Mood) => void;
  };
  [BottomSheetType.JOURNAL_WRITE]: {
    moodType: MoodType;
    moodLevel: MoodLevel;
    onSubmit: (draft: Draft) => void;
    isLoading: boolean;
    isSubmitted: boolean;
  };
};

export type BottomSheetState = {
  isOpen: boolean;
  type: Nullable<BottomSheetType>;
  snapPoint: number[] | string[];
  props: any;
};

export type BottomSheetAction =
  | {
      type: 'OPEN_BOTTOM_SHEET';
      payload: {
        type: BottomSheetType;
        props: any;
        snapPoint: number[] | string[];
      };
    }
  | { type: 'CLOSE_BOTTOM_SHEET' };

export interface BottomSheetContextType {
  state: BottomSheetState;
  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    snapPoint: number[] | string[],
    props: BottomSheetProps[T],
  ) => void;
  hideBottomSheet: () => void;
}
