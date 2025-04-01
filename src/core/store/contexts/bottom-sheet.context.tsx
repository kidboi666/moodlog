import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { bottomSheetReducer } from '@/core/store/reducers/bottom-sheet.reducer';
import {
  BottomSheetContextType,
  BottomSheetProps,
  BottomSheetState,
  BottomSheetType,
} from '../types/bottom-sheet.types';
import { Nullable } from '@/types/utill.types';

const initialBottomSheetState: BottomSheetState = {
  isOpen: false,
  type: null,
  snapPoint: [0],
  props: {},
};

const BottomSheetContext =
  createContext<Nullable<BottomSheetContextType>>(null);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    bottomSheetReducer,
    initialBottomSheetState,
  );

  const showBottomSheet = useCallback(
    <T extends BottomSheetType>(
      type: T,
      snapPoint: number[] | string[],
      props: BottomSheetProps[T],
    ) => {
      dispatch({
        type: 'OPEN_BOTTOM_SHEET',
        payload: { type, snapPoint, props },
      });
    },
    [],
  );

  const hideBottomSheet = useCallback(() => {
    dispatch({ type: 'CLOSE_BOTTOM_SHEET' });
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        state,
        showBottomSheet,
        hideBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
